import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getTasks, updateTask, deleteTask} from './tasksSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Grid,
  Paper,
} from '@mui/material';

export default function TasksList() {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user?.id);
  const {tasks} = useSelector((state) => state.tasks);

  const [readOnly, setReadOnly] = useState(true);

  useEffect(() => {
    dispatch(getTasks({userId}));
  }, []);

  let tasksArray = tasks.map((task) => (
    <ListItem key={task._id} sx={{padding: 0}}>
      <ListItemButton
        type="text"
        defaultValue={task.content}
        readOnly={readOnly}
        onFocus={() => setReadOnly(false)}
        onKeyUp={(e) => {
          if (e.key === 'Enter') {
            dispatch(updateTask({id: task._id, content: e.target.value}));
          }
        }}
      >
        <ListItemText>{task.content}</ListItemText>

        <IconButton
          edge="end"
          color="primary"
          onClick={() => dispatch(deleteTask({id: task._id}))}
        >
          <DeleteIcon />
        </IconButton>
      </ListItemButton>
    </ListItem>
  ));

  return (
    <Paper elevation={0} sx={{mt: 4}}>
      <Grid container justifyContent="center" spacing={0}>
        <Grid item xs={12}>
          <List sx={{padding: 0}}>{tasksArray}</List>
        </Grid>
      </Grid>
    </Paper>
  );
}
