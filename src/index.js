import React from 'react';
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom/client';
import Todo from './Page/Todo';
import { store } from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Todo />
    </Provider>
  </React.StrictMode>
);