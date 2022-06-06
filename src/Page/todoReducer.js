const initialState = {
  todos:[]
}

function todoReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return { ...state, todos: [...state.todos, action.payload] }
    
    case 'DELETE_TODO':
      {
        const tempTodos = [...state.todos]
        const targetIndex = tempTodos.findIndex(item=> item.id === action.payload)
        tempTodos.splice(targetIndex, 1)
        return { ...state, todos: [...tempTodos] }
      }

    case 'UPDATE_COMPLETED':
      {
        const tempTodos = [...state.todos]
        const targetIndex = tempTodos.findIndex(item => item.id === action.payload)
        tempTodos[targetIndex].completed = !tempTodos[targetIndex].completed
        return { ...state, todos: [...tempTodos] }
      }
    default:
      return state
  }
}

export default todoReducer