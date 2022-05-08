import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../auth/authSlice';
import {resetTasks} from '../tasks/tasksSlice';
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

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
    dispatch(logout());
    dispatch(resetTasks());
    navigate('/');
  }

  return (
    <nav>
      {user ? (
        <>
          <h1>
            Hello,{' '}
            {firstName.replace(firstName[0], firstName[0]?.toUpperCase())}!
          </h1>
          <button onClick={onClickLogout}>Log Out</button>
        </>
      ) : (
        <>
          {' '}
          <h1>Welcome to TaskManager2!</h1>
        </>
      )}
    </nav>
  );
}
