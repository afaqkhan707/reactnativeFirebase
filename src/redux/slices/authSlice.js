import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  currentUser: null,
  isLoggedIn: false,
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload;
      state.isLoggedIn = !!action.payload;
    },
    // Add other authentication-related actions here
    // Example: logout, updateProfile, setToken, etc.
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
