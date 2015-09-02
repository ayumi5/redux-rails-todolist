import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './containers/App';
import newtodos from './reducers';
import 'babel-core/polyfill';

let store = createStore(newtodos);
let rootElement = document.getElementById('root');
React.render(
  <Provider store={store}>
    {() => <App />}
  </Provider>,
  rootElement
);

//for verify its working
// import { newTodo, completeTodo } from './actions';
// let store = createStore(newtodos);
// console.log(store.getState());
// let unsubscribe = store.subscribe(() =>
//   console.log(store.getState())
// );
//
// store.dispatch(newTodo('Study Redux'));
// store.dispatch(newTodo('Love Dog'));
// store.dispatch(newTodo('Testing'));
// store.dispatch(completeTodo(1));
// unsubscribe()
