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
        tempTodos.splice(action.payload, 1)
        return { ...state, todos: [...tempTodos] }
      }
    default:
      return state
  }
}

export default todoReducer