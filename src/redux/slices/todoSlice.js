import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  todos: [],
  isLoading: false,
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: {},
    deleteTodo: {},
    updateTodo: {},
  },
});

export const { addTodo, deleteTodo, updateTodo } = todoSlice.actions;
export default todoSlice.reducer;
