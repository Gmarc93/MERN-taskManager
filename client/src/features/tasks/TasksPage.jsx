import TaskForm from './TaskForm';
import TasksList from './TasksList';
import {Container} from '@mui/material';

export default function TaskPage() {
  return (
    <Container sx={{mt: 8}} maxWidth="md">
      <TaskForm />
      <TasksList />
    </Container>
  );
}
