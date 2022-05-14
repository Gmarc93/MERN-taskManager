import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../auth/authSlice';
import {resetTasks} from '../tasks/tasksSlice';
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Button, Toolbar} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import {IconButton} from '@mui/material';
import {AppBar} from '@mui/material';
import Box from '@mui/material/Box';
import {Typography} from '@mui/material';

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.auth);
  const [firstName, setFirstName] = useState('');

  useEffect(() => {
    if (user?.name) {
      setFirstName(user.name.split(' ')[0]);
    }
  }, [user?.name]);

  function onClickLogout() {
    if (user) {
      dispatch(logout());
      dispatch(resetTasks());
      // navigate('/');
    }

    navigate('/');
  }

  return (
    <Box sx={{flexGrow: 1}}>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{flexGrow: 1}}>
            <Typography
              color="inherit"
              variant="h6"
              component="a"
              href="/"
              sx={{textDecoration: 'none'}}
            >
              TaskManager
            </Typography>
          </Box>
          {user && (
            <Button color="inherit" onClick={onClickLogout}>
              Log Out
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
