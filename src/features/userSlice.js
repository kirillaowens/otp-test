import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Fetch users (получить одного пользователя)
const apiKey = process.env.REACT_APP_API_KEY;

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await fetch('https://api.api-ninjas.com/v1/randomuser', {
    headers: { 'X-Api-Key': apiKey }
  });
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  const data = await response.json();
  return data;  // Возвращаем одного пользователя (не массив)
});

// Добавить нового пользователя
export const addUser = createAsyncThunk('users/addUser', async () => {
  const response = await fetch('https://api.api-ninjas.com/v1/randomuser', {
    headers: { 'X-Api-Key': apiKey }
  });
  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }
  const data = await response.json();
  return [data];  // Всегда возвращаем массив, даже если это один объект
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
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = [action.payload];  // Обновляем список, оставляя только одного пользователя
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addUser.pending, (state) => {
        state.addUserStatus = 'loading';
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.addUserStatus = 'succeeded';
        // Добавляем нового пользователя в список
        state.users.push(...action.payload);
      })
      .addCase(addUser.rejected, (state, action) => {
        state.addUserStatus = 'failed';
        state.error = action.error.message;
      });
  },
});

export default usersSlice.reducer;
