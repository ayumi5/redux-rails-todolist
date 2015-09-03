import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import NewToDo from '../components/NewToDo';
import ToDo from '../components/ToDo';
import ToDoList from '../components/ToDoList';
import { newTodo, completeTodo } from '../actions'
import { Provider } from 'react-redux';
import newtodos from '../reducers';
//import { finalCreateStore } from '../store/configureStore';
//import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';

//const store = finalCreateStore(newtodos);

export default class App extends Component {
  render(){
    const { dispatch, allTodos } = this.props;
    return (
      <div>
        <NewToDo onAddClick={text =>
          dispatch(newTodo(text))
        }/>
        <ToDoList
          todos={allTodos}
          onTodoClick={index =>
            dispatch(completeTodo(index))
          }/>
      </div>
    );
  }
}

function select(state){
  return {
    allTodos: state.todos
  };
}

export default connect(select)(App);
