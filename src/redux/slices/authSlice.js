// authSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  error: null,
  isLoggedIn: false,
  isLoading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
      state.isLoggedIn = true;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoggedIn = false;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setCurrentUser, setError, setLoading } = authSlice.actions;
export default authSlice.reducer;
