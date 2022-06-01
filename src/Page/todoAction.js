export const addTodo = textInput => (
  {
    type: 'ADD_TODO',
    payload: {
      value: textInput,
      completed: false
    }
  }
)

export const deleteTodo = index => (
  {
    type: 'DELETE_TODO',
    payload: index
  }
)