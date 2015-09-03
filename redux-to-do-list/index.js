import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './containers/App';
import newtodos from './reducers';
import 'babel-core/polyfill';

import { finalCreateStore } from './store/configureStore';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';

const store = finalCreateStore(newtodos);
//let store = createStore(newtodos);
let rootElement = document.getElementById('root');
React.render(
  <div>
    <Provider store={store}>
      {() => <App />}
    </Provider>
    <DebugPanel top right bottom>
      <DevTools store={store} monitor={LogMonitor} />
    </DebugPanel>
  </div>,
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
