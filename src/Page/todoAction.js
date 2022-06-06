export const addTodo = ({ text, id }) => (
  {
    type: 'ADD_TODO',
    payload: {
      text,
      id,
      completed: false,
    }
  }
)
  

export const deleteTodo = index => (
  {
    type: 'DELETE_TODO',
    payload: index
  }
)

export const updateCompleted = index => (
  {
    type: 'UPDATE_COMPLETED',
    payload: index
  }
)