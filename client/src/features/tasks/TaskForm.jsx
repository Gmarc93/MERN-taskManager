import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {createTask} from './tasksSlice';
import {logout} from '../auth/authSlice';
import {resetTasks} from './tasksSlice';
import {Button, Grid, Typography, Input, TextField, Paper} from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import IconButton from '@mui/material/IconButton';

export default function TaskForm() {
  const dispatch = useDispatch();
  const taskError = useSelector((state) => state.tasks.error);
  const user = useSelector((state) => state.auth.user);

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
    <Paper sx={{padding: 6}} elevation={0}>
      {/* <Grid item sm={12}> */}
      <Typography align="center" variant="h4">
        {`Hello, ${user.name.split(' ')[0]}!`}
      </Typography>
      {/* </Grid> */}
      <Grid
        container
        spacing={3}
        justifyContent="center"
        component="form"
        onSubmit={onSubmitTaskForm}
        sx={{mt: 4}}
      >
        <Grid item xs={12} sm={10}>
          <TextField
            size="small"
            required
            fullWidth
            type="text"
            placeholder="Enter task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            autoFocus
          />
        </Grid>
        <Grid item xs={12} sm={10}>
          <Button
            fullWidth
            type="submit"
            size="medium"
            color="primary"
            variant="contained"
          >
            Create Task
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}
