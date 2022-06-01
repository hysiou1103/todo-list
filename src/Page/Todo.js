import React, { useEffect } from 'react';
import { createStore } from 'redux';
import todoReducer from './todoReducer';
import * as action from './todoAction'
import './todo.scss';

const store = createStore(
  todoReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

function Todo() {
  useEffect(() => {
    const btnListener = document.querySelector('.addBtn')
    btnListener.addEventListener('click', addTodo)


    const todoList = document.querySelector('.todoList')
    todoList.addEventListener('click', editTodo)

    return () => {
      btnListener.removeEventListener('click', addTodo)
      todoList.removeEventListener('click', editTodo)
    }
  },[])
  
  const addTodo = () => {
    const inputField = document.querySelector('.addingField')
    if (inputField.value.trim()) {
      store.dispatch(action.addTodo(inputField.value.trim()))
      inputField.value = ''
    }
  }

  const editTodo = (e) => {
    console.log(e.target.value)
  }

  store.subscribe(() => {
    renderTodoList()
  })

  const renderTodoList = () => {
    const todoState = store.getState().todos
    const composeLI = todoState.map((item, index) =>
      `<li class="todoItem" key=${index}>
        <div class="checkGroup">
          <input type="checkbox"/>
          <p>${item.value}</p>
        </div>
        <span class="deleteBtn"></span>
      </li>`
    )
    const todoList = document.querySelector('.todoList')
    todoList.innerHTML = composeLI
  }

  return (
    <div className="wrap">
      <h1 className='title'>Todo List</h1>
      <div className="inputGroup">
        <input className='addingField' type="text" placeholder='Adding New Todo Here...' />
        <button className='addBtn'> + </button>
      </div>
      <ul className='todoList'></ul>
    </div>
  );
}

export default Todo;
