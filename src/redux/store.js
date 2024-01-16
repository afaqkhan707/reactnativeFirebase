import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/slices/authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    // other reducers can be added here
  },
});

export { store };
