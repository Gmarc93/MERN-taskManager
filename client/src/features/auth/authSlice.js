import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';
import app from '../../api/index';

const loadToken = createAsyncThunk('auth/loadToken', async (data, thunkAPI) => {
  try {
    const res = await app.get('/auth/loadToken');
    return res.data;
  } catch (err) {
    throw thunkAPI.rejectWithValue(err.response.data);
  }
});

const signup = createAsyncThunk('auth/signup', async (data, thunkAPI) => {
  try {
    const res = await app.post('/auth/signup', data);
    return res.data;
  } catch (err) {
    throw thunkAPI.rejectWithValue(err.response.data);
  }
});

const login = createAsyncThunk('auth/login', async (data, thunkAPI) => {
  try {
    const res = await app.post('/auth/login', data);
    return res.data;
  } catch (err) {
    throw thunkAPI.rejectWithValue(err.response.data);
  }
});

const initialState = {
  status: 'idle',
  user: null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state, action) {
      state.status = 'idle';
      state.user = null;
      state.error = null;
      localStorage.clear();
    },
    resetAuth(state, action) {
      state.status = 'idle';
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadToken.pending, (state, action) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loadToken.fulfilled, (state, action) => {
        state.status = 'success';
        state.user = jwtDecode(action.payload);
      })
      .addCase(loadToken.rejected, (state, action) => {
        state.status = 'fail';
        state.error = action.payload;
      })
      .addCase(signup.pending, (state, action) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.status = 'success';
        state.user = jwtDecode(action.payload);
        state.error = null;
        localStorage.setItem('jwt', action.payload);
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = 'fail';
        state.error = action.payload;
      })
      .addCase(login.pending, (state, action) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'success';
        state.user = jwtDecode(action.payload);
        state.error = null;
        localStorage.setItem('jwt', action.payload);
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'fail';
        state.error = action.payload;
      });
  },
});

export {loadToken, signup, login};
export const {logout, resetAuth} = authSlice.actions;
export default authSlice.reducer;
