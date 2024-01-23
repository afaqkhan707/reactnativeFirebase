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
  },
  // setLogout: (state, action) => {
  //   state.currentUser = action.payload.null;
  //   state.error = action.payload.null;
  //   state.isLoggedIn = action.payload.false;
  //   state.isLoading = action.payload.false;
  // },
});

export const { setCurrentUser, setError, setLoading, setLogout } =
  authSlice.actions;
export default authSlice.reducer;
