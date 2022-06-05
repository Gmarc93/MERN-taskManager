import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {signup, login, resetAuth} from './authSlice';
import {
  Container,
  Paper,
  Grid,
  Button,
  Typography,
  Backdrop,
  CircularProgress,
} from '@mui/material';
import Input from './Input';

export default function Auth() {
  console.log('auth.jsx');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [formButtonValue, setFormButtonValue] = useState('Log In');

  const [signupDisplay, setSignupDisplay] = useState(false);

  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.error);
  const authStatus = useSelector((state) => state.auth.status);

  function onChangeFirstName(e) {
    setFirstName(e.target.value);
  }
  function onChangeLastName(e) {
    setLastName(e.target.value);
  }
  function onChangeEmail(e) {
    setEmail(e.target.value);
  }
  function onChangePassword(e) {
    setPassword(e.target.value);
  }
  function onChangePasswordConfirm(e) {
    setPasswordConfirm(e.target.value);
  }

  useEffect(() => {
    if (error?.message && !signupDisplay) {
      setEmail('');
      setPassword('');
      setFormButtonValue('Log In');
      return;
    }

    if (error?.message && signupDisplay) {
      setFormButtonValue('Sign Up');
    }
  }, [error?.message, signupDisplay]);

  function switchAuthDisplay() {
    if (signupDisplay) {
      dispatch(resetAuth());

      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setPasswordConfirm('');
      setFormButtonValue('Log In');
      setSignupDisplay(false);
    } else {
      dispatch(resetAuth());

      setEmail('');
      setPassword('');
      setFormButtonValue('Sign Up');
      setSignupDisplay(true);
    }
  }

  function onSubmitAuthForm(e) {
    e.preventDefault();

    setFormButtonValue('Loading...');

    if (signupDisplay) {
      // Implement validation
      return dispatch(
        signup({
          name: `${firstName} ${lastName}`,
          email,
          password,
          passwordConfirm,
        })
      );
    }

    // Implement validation
    dispatch(login({email, password}));

    e.target[0].focus();
  }

  if (authStatus === 'loading')
    return (
      <Backdrop
        sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );

  return (
    <Container sx={{mt: 4}} maxWidth="xs">
      <Typography align="center" sx={{mb: 4}}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, harum
        quisquam cumque quia sint eaque.
      </Typography>

      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '1rem',
          ml: 2,
          mr: 2,
        }}
        elevation={6}
      >
        <form onSubmit={onSubmitAuthForm}>
          <Grid container spacing={2}>
            {signupDisplay && (
              <>
                <Input
                  type="text"
                  placeholder="First name"
                  autoFocus
                  half
                  value={firstName}
                  onChangeHandler={onChangeFirstName}
                />
                <Input
                  type="text"
                  placeholder="Last name"
                  half
                  value={lastName}
                  onChangeHandler={onChangeLastName}
                />
              </>
            )}
            {signupDisplay && (
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChangeHandler={onChangeEmail}
              />
            )}
            {!signupDisplay && (
              <Input
                type="email"
                placeholder="Email"
                autoFocus
                value={email}
                onChangeHandler={onChangeEmail}
              />
            )}
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChangeHandler={onChangePassword}
            />

            {signupDisplay && (
              <Input
                type="password"
                placeholder="Confirm password"
                value={passwordConfirm}
                onChangeHandler={onChangePasswordConfirm}
              />
            )}
            {error?.message !== 'Token does not exist.' &&
              error !== null &&
              error?.message !== 'jwt expired' && (
                <Grid item>
                  <Typography component="p" sx={{color: 'red'}}>
                    {error?.message}
                  </Typography>
                </Grid>
              )}
          </Grid>
          <Button
            variant="contained"
            type="submit"
            fullWidth
            sx={{m: '1rem 0 1rem'}}
          >
            {formButtonValue}
          </Button>
        </form>
        <Button onClick={switchAuthDisplay}>
          {signupDisplay
            ? 'Already have an account? Log in'
            : "Don't have an account? Sign up"}
        </Button>
      </Paper>
    </Container>
  );
}
