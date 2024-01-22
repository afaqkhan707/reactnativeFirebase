import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/slices/authSlice';
import todoReducer from '../redux/slices/todoSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    todo: todoReducer,
    // other reducers can be added here
  },
});

export { store };
