import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {signup, login, resetAuth} from './authSlice';

export default function Auth() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [formButtonValue, setFormButtonValue] = useState('Log In');

  const [signupDisplay, setSignupDisplay] = useState(false);

  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.error);

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

  return (
    <>
      <form onSubmit={onSubmitAuthForm}>
        {signupDisplay && (
          <>
            <input
              type="text"
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              autoFocus
            />
            <input
              type="text"
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </>
        )}
        {signupDisplay && (
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        )}
        {!signupDisplay && (
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
          />
        )}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {signupDisplay && (
          <input
            type="password"
            placeholder="Confirm password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
        )}
        {error?.message !== 'Token does not exist.' && error !== null && (
          <p>{error?.message}</p>
        )}
        <button>{formButtonValue}</button>
      </form>

      <button onClick={switchAuthDisplay}>
        {signupDisplay
          ? 'Already have an account? Log in'
          : "Don't have an account? Sign up"}
      </button>
    </>
  );
}
