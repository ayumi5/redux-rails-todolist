import 'babel-core/polyfill';
import React from 'react';
import { Provider } from 'react-redux';
import App from './containers/App';
import rootReducer from './reducers';
import { finalCreateStore } from './store/configureStore';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';

const store = finalCreateStore(rootReducer);

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
// import { newTodo, completeTodo, fetchList, requestList, receiveList } from './actions';
// console.log(store.getState());
// let unsubscribe = store.subscribe(() =>
//   console.log(store.getState())
// );

//store.dispatch(newTodo('Study Redux'));
//store.dispatch(fetchList('ok'));
// store.dispatch(newTodo('Love Dog'));
// store.dispatch(newTodo('Testing'));
// store.dispatch(completeTodo(1));
// unsubscribe()
