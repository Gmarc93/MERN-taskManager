import axios from 'axios';

const app = axios.create({
  baseURL: 'http://localhost:8000',
});

app.interceptors.request.use((req) => {
  const token = localStorage.getItem('jwt');

  if (token) {
    req.headers.authorization = `Bearer ${token}`;
  }
  return req;
});

export default app;
