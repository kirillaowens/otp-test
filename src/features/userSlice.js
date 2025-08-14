// userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const apiKey = process.env.REACT_APP_API_KEY;

// Получить одного пользователя
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await fetch('https://api.api-ninjas.com/v1/randomuser', {
    headers: { 'X-Api-Key': apiKey }
  });
  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }
  const data = await response.json();
  return data;
});

// Добавить пользователя
export const addUser = createAsyncThunk('users/addUser', async () => {
  const response = await fetch('https://api.api-ninjas.com/v1/randomuser', {
    headers: { 'X-Api-Key': apiKey }
  });
  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }
  const data = await response.json();
  return data;
});

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    status: 'idle',
    addUserStatus: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Получение пользователей
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = [action.payload]; // Обновляем список одним пользователем
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Добавление пользователя
      .addCase(addUser.pending, (state) => {
        state.addUserStatus = 'loading';
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.addUserStatus = 'succeeded';
        state.users.push(action.payload); // Просто добавляем в массив
      })
      .addCase(addUser.rejected, (state, action) => {
        state.addUserStatus = 'failed';
        state.error = action.error.message;
      });
  },
});

export default usersSlice.reducer;
