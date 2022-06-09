import { createSlice, nanoid  } from "@reduxjs/toolkit"

const initialState = {
  todos:[]
}

const todoReducer = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      action.payload.id = nanoid()
      state.todos.push(action.payload)
    },
    deleteTodo: (state, action) => {
      const targetIndex = state.todos.findIndex(item => item.id === action.payload)
      state.todos.splice(targetIndex, 1)
    },
    updateCompleted: (state, action) => {
      const targetIndex = state.todos.findIndex(item => item.id === action.payload)
      state.todos[targetIndex].completed = !state.todos[targetIndex].completed
    }
  }
})

export const { addTodo, deleteTodo, updateCompleted } = todoReducer.actions
export default todoReducer.reducer