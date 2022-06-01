export const addTodo = textInput => (
  {
    type: 'ADD_TODO',
    payload: {
      value: textInput,
      completed: false
    }
  }
)