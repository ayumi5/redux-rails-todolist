import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import NewToDo from '../components/NewToDo';
import ToDo from '../components/ToDo';
import ToDoList from '../components/ToDoList';
import FetchList from '../components/FetchList';
import { newTodo, completeTodo, fetchList, postList } from '../actions'

export default class App extends Component {
  render(){
    const { dispatch, allTodos, lists } = this.props;
    return (
      <div>
        <NewToDo onAddClick={text =>
          dispatch(postList(text))
        }/>
        <ToDoList
          todos={allTodos}
          onTodoClick={index =>
            dispatch(completeTodo(index))
          }/>
        <FetchList
          lists={lists}
          onFetchClick={type =>
            dispatch(fetchList(type))
          }/>
      </div>
    );
  }
}

function select(state){
  return {
    allTodos: state.newtodos,
    lists: state.lists
  };
}

export default connect(select)(App);
