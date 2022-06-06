import React, { useEffect } from 'react'
import { createStore } from 'redux'
import todoReducer from './todoReducer'
import * as action from './todoAction'
import './todo.scss'

const store = createStore(
  todoReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default function Todo() {
  useEffect(() => {
    const btnListener = document.querySelector('.addBtn')
    const addingField = document.querySelector('.addingField')
    btnListener.addEventListener('click', addTodo)
    addingField.addEventListener('keypress', (e) => {
      if (e.keyCode === 13) {addTodo()}
    })


    const todoList = document.querySelector('.todoList')
    todoList.addEventListener('click', editTodo)

    return () => {
      btnListener.removeEventListener('click', addTodo)
      addingField.addEventListener('keypress', (e) => {
        if (e.keyCode === 13) {addTodo()}
      })
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
    const editTarget = parseInt(e.target.dataset.num)
    if(e.target.nodeName ==='SPAN'){
      store.dispatch(action.deleteTodo(editTarget))
    }
        if(e.target.nodeName ==='INPUT'){
      store.dispatch(action.updateCompleted(editTarget))
    }
  }

  store.subscribe(() => {
    renderTodoList()
  })

  const renderTodoList = () => {
    const todoState = store.getState().todos
    const composeLI = todoState.map((item, index) =>
      `<li class="todoItem" key=${index}>
        <div class="checkGroup">
          <input type="checkbox" data-num=${index} ${item.completed ? 'checked' : null} />
          <p class=${item.completed? 'completedItem' : null}>${item.value}</p>
        </div>
        <span class="deleteBtn" data-num=${index} }></span>
      </li>`
    ).join('')
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