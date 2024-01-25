import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  error: null,
  isLoggedIn: false,
  isLoading: false,
  isLoadingPage: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload.userDetails;
      state.isLoggedIn = action.payload.status;
      state.error = action.payload.error;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setIsLoadingPage: (state, action) => {
      state.isLoadingPage = action.payload;
    },
  },
});

export const { setCurrentUser, setError, setLoading, setIsLoadingPage } =
  authSlice.actions;
export default authSlice.reducer;
