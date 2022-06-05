import React from 'react';
import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';
import {store} from './app/store';
import App from './app/App';
import reportWebVitals from './reportWebVitals';
import {CssBaseline} from '@mui/material';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import './index.css';

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: `
      body {
        background: #f0f2f5;
      }
      `,
    },
  },
});

const container = document.getElementById('app');
const root = createRoot(container);

root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </Provider>
  // </React.StrictMode>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
