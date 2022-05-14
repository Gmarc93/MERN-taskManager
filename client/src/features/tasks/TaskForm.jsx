import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {createTask} from './tasksSlice';
import {logout} from '../auth/authSlice';
import {resetTasks} from './tasksSlice';
import {Button} from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import IconButton from '@mui/material/IconButton';

export default function TaskForm() {
  const dispatch = useDispatch();
  const taskError = useSelector((state) => state.tasks.error);

  const [task, setTask] = useState('');

  function onSubmitTaskForm(e) {
    e.preventDefault();
    dispatch(createTask({content: task}));

    setTask('');
  }

  useEffect(() => {
    if (taskError) {
      dispatch(logout());
      dispatch(resetTasks());
    }
  }, [taskError, dispatch]);

  return (
    <>
      <h2>Task Form</h2>
      <form onSubmit={onSubmitTaskForm}>
        <div>
          <input
            type="text"
            placeholder="Enter task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            autoFocus
          />
          <Button
            type="submit"
            size="small"
            color="primary"
            variant="contained"
          >
            <AddOutlinedIcon />
          </Button>
        </div>
      </form>
    </>
  );
}
