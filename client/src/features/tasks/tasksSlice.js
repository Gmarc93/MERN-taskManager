import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import app from '../../api/index';

const createTask = createAsyncThunk(
  'tasks/createTask',
  async (data, thunkAPI) => {
    try {
      const res = await app.post('/tasks', data);
      return res.data;
    } catch (err) {
      throw thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

const getTasks = createAsyncThunk('tasks/getTasks', async (_, thunkAPI) => {
  try {
    const res = await app.get('/tasks');
    return res.data;
  } catch (err) {
    throw thunkAPI.rejectWithValue(err.response.data);
  }
});

const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async (data, thunkAPI) => {
    try {
      const res = await app.patch(`tasks/${data.id}`, data);
      return res.data;
    } catch (err) {
      throw thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (data, thunkAPI) => {
    try {
      const res = await app.delete(`tasks/${data.id}`);
      return res.data;
    } catch (err) {
      throw thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

const initialState = {
  tasks: [],
  status: 'idle',
  error: null,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    resetTasks(state) {
      state.tasks = [];
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTask.pending, (state, action) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.status = 'success';
        state.error = null;
        state.tasks.push(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.status = 'fail';
        state.error = action.payload;
      })
      .addCase(getTasks.pending, (state, action) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.status = 'success';
        state.error = null;
        state.tasks = action.payload;
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.status = 'fail';
        state.error = action.payload;
      })
      .addCase(updateTask.pending, (state, action) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.status = 'success';
        state.tasks.find((task) => task._id === action.payload._id).content =
          action.payload.content;
        state.error = null;
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.status = 'fail';
        state.error = action.payload;
      })
      .addCase(deleteTask.pending, (state, action) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.status = 'success';
        const index = state.tasks.indexOf(
          state.tasks.find((task) => task._id === action.payload._id)
        );
        state.tasks.splice(index, 1);
        state.error = null;

        // You could also use array.filter()
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.status = 'fail';
        state.error = action.payload;
      });
  },
});

export {createTask, getTasks, updateTask, deleteTask};
export const {resetTasks} = tasksSlice.actions;
export default tasksSlice.reducer;
