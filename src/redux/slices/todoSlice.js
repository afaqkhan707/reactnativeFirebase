import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  todos: [],
  isLoading: false,
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos = action.payload;
    },
    setDeleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    setUpdateTodo: {},
    setLoadingAdd: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { addTodo, setDeleteTodo, setUpdateTodo, setLoadingAdd } =
  todoSlice.actions;
export default todoSlice.reducer;
