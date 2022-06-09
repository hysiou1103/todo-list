import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTodo, deleteTodo, updateCompleted } from './todoSlice'
import './todo.scss'

const tabOptions = [
  { value: 'all', label: '全部' },
  { value: 'inProgress', label: '進行中' },
  { value: 'finished', label: '已完成' },
]

export default function Todo() {
  const dispatch = useDispatch()
  const todos = useSelector((state) => state.todos);
  const [chosenTab, setChosenTab] = useState('all')
  const [renderTodos, setRenderTodos] = useState([])

  useEffect(() => {
    if (chosenTab === 'all') { setRenderTodos([...todos]) }
    if (chosenTab === 'inProgress') { setRenderTodos([...todos.filter(item => !item.completed)]) }
    if (chosenTab === 'finished') { setRenderTodos([...todos.filter(item => item.completed)]) }
  }, [chosenTab, todos])
  
  const [inputField, setInputField] = useState('')
  const prepareAddTodo = () => {
    if (inputField) {
      const text = inputField
      dispatch(addTodo({ text, completed:false }))
      setInputField('')
    }
  }
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {prepareAddTodo()}
  }

  return (
    <div className="wrap">
      <h1 className='title'>Todo List</h1>
      <div className="inputGroup">
        <input className='addingField' type="text" placeholder='Adding New Todo Here...'
          value={inputField}
          onChange={e => setInputField(e.target.value.trim())}
          onKeyPress={handleKeyPress}
        />
        <button className='addBtn' onClick={prepareAddTodo}> + </button>
      </div>
      <ul className='statusTab'>
        {tabOptions.map(item =>
          <li className={`tabItem ${chosenTab === item.value ? 'active' : ''}`} key={item.value}
            onClick={()=> setChosenTab(item.value)}
          >
           {item.label}
          </li>
        )}
      </ul>
      <ul className='todoList'>
        {renderTodos.map(item => 
          <li className="todoItem" key={item.id}>
            <div className="checkGroup">
              <input type="checkbox"
                checked={item.completed}
                onChange={() => { dispatch(updateCompleted(item.id)) }}
              />
              <p className={item.completed? 'completedItem' : null}>{item.text}</p>
            </div>
            <span className="deleteBtn"
              onClick={() => { dispatch(deleteTodo(item.id)) }}
            />
          </li>
        )}
      </ul>
    </div>
  );
}