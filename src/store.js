import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import todoReducer from './Page/todoSlice'

export const store = configureStore({
  reducer: todoReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})