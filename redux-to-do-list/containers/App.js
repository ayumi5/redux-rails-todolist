import React, {Component, PropTypes} from 'react';
import { Provider } from 'react-redux';
import NewToDo from '../components/new-to-do';
import { newTodo } from '../actions';
import newtodos from '../reducers';
import { compose, createStore, applyMiddleware } from 'redux';
import { devTools, persistState } from 'redux-devtools';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import thunk from 'redux-thunk';

const finalCreateStore = compose(
  applyMiddleware(thunk),
  devTools(),
  persistState(
    window.location.href.match(/[?&]debug_session=([^&]+)\b/)
  ),
  createStore
);

const store = finalCreateStore(newtodos);

export default class App extends Component {
  render(){
    const { dispatch } = this.props;
    return (
      <div>
        <Provider store={store}>
          {() => <NewToDo onAddClick={text => dispatch(newTodo(text))}/>}
        </Provider>
        <DebugPanel top right bottom>
          <DevTools store={store} monitor={LogMonitor} />
        </DebugPanel>
      </div>
    );
  }
}
