import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getTasks, updateTask, deleteTask} from './tasksSlice';

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
      <button onClick={() => dispatch(deleteTask({id: task._id}))}>
        Delete
      </button>
    </div>
  ));

  return (
    <>
      <h2>Tasks List</h2>
      {tasksArray}
    </>
  );
}
