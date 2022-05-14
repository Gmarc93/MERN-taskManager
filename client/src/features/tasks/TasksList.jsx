import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getTasks, updateTask, deleteTask} from './tasksSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import HighlightOffTwoToneIcon from '@mui/icons-material/HighlightOffTwoTone';

export default function TasksList() {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user?.id);
  const {tasks} = useSelector((state) => state.tasks);

  const [readOnly, setReadOnly] = useState(true);

  useEffect(() => {
    dispatch(getTasks({userId}));
  }, []);

  let tasksArray = tasks.map((task) => (
    <div key={task._id}>
      <input
        type="text"
        defaultValue={task.content}
        readOnly={readOnly}
        onFocus={() => setReadOnly(false)}
        onKeyUp={(e) => {
          if (e.key === 'Enter') {
            dispatch(updateTask({id: task._id, content: e.target.value}));
          }
        }}
      />
      <IconButton
        color="primary"
        onClick={() => dispatch(deleteTask({id: task._id}))}
      >
        <DeleteIcon />
      </IconButton>
    </div>
  ));

  return (
    <>
      <h2>Tasks List</h2>
      {tasksArray}
    </>
  );
}
