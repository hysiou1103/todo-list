import { applyMiddleware, compose, createStore } from 'redux'
import logger from 'redux-logger';
import todoReducer from './Page/todoReducer'

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(todoReducer, composeEnhancer(applyMiddleware(logger)))