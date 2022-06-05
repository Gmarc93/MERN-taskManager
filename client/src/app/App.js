import './App.css';

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Navbar from '../features/UI/Navbar';
import TasksPage from '../features/tasks/TasksPage';
import Auth from '../features/auth/Auth';
import {loadToken} from '../features/auth/authSlice';
import {Container} from '@mui/material';
import Copyright from '../features/UI/Copyright';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (!token) return;
    dispatch(loadToken({token}));
  }, []);

  const user = useSelector((state) => state.auth.user);

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          {user ? (
            <Route path="/" element={<TasksPage />} />
          ) : (
            <Route path="/" element={<Auth />} />
          )}
        </Routes>
        <Copyright sx={{mt: 8, mb: 4}} />
      </Router>
    </>
  );
}

export default App;
