import React, {Component, PropTypes} from 'react';
import { Provider } from 'react-redux';
import NewToDo from '../components/new-to-do';
import { newTodo } from '../actions';
import newtodos from '../reducers';
import { finalCreateStore } from '../store/configureStore';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';

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
