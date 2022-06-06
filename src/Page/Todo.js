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

    const statusTab = document.querySelector('.statusTab')
    statusTab.addEventListener('click', changeStatus)

    renderTabItem('all')

    return () => {
      btnListener.removeEventListener('click', addTodo)
      addingField.addEventListener('keypress', (e) => {
        if (e.keyCode === 13) {addTodo()}
      })
      todoList.removeEventListener('click', editTodo)
      statusTab.removeEventListener('click', changeStatus)
    }
  }, [])
  
  const addTodo = () => {
    const inputField = document.querySelector('.addingField')
    if (inputField.value.trim()) {
      const id = new Date() * 1000
      store.dispatch(action.addTodo({text:inputField.value.trim(), id}))
      inputField.value = ''
    }
  }

  const editTodo = (e) => {
    const editTarget = parseInt(e.target.dataset.id)
    if(e.target.nodeName ==='SPAN'){
      store.dispatch(action.deleteTodo(editTarget))
    }
    if(e.target.nodeName ==='INPUT'){
      store.dispatch(action.updateCompleted(editTarget))
    }
  }

  let displayStatus = 'all'

  const changeStatus = (e) => {
    displayStatus = e.target.dataset.status
    renderTabItem(displayStatus)
    renderTodoList(filterData(displayStatus))
  }

  store.subscribe(() => {
    renderTodoList(filterData(displayStatus))
  })

  const filterData = (displayStatus) => {
    const originTodo = store.getState().todos
    if (displayStatus === 'all') return originTodo
    if (displayStatus === 'inProgress') return originTodo.filter(item => !item.completed)
    if (displayStatus === 'finished') return originTodo.filter(item => item.completed)
  }

  const renderTabItem = (displayStatus) => {
    const tabOptions = [
      { value: 'all', label: '全部' },
      { value: 'inProgress', label: '進行中' },
      { value: 'finished', label: '已完成' },
    ]
     const composeTab = tabOptions.map((item) => 
       `
        <li class='tabItem ${displayStatus === item.value ? 'active' : ''}'
          key=${item.value}
          data-status=${item.value}
        >
          ${item.label}
        </li>
       `
    ).join('')
    const statusTab = document.querySelector('.statusTab')
    statusTab.innerHTML = composeTab
  }

  const renderTodoList = (filteredTodo) => {
    const composeTodo = filteredTodo.map(item =>
      `<li class="todoItem" key=${item.id}>
        <div class="checkGroup">
          <input type="checkbox" data-id=${item.id} ${item.completed ? 'checked' : null} />
          <p class=${item.completed? 'completedItem' : null}>${item.text}</p>
        </div>
        <span class="deleteBtn" data-id=${item.id} }></span>
      </li>`
    ).join('')
    const todoList = document.querySelector('.todoList')
    todoList.innerHTML = composeTodo
  }

  return (
    <div className="wrap">
      <h1 className='title'>Todo List</h1>
      <div className="inputGroup">
        <input className='addingField' type="text" placeholder='Adding New Todo Here...' />
        <button className='addBtn'> + </button>
      </div>
      <ul className='statusTab'></ul>
      <ul className='todoList'></ul>
    </div>
  );
}