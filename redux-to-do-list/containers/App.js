import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import NewToDo from '../components/NewToDo';
import ToDo from '../components/ToDo';
import ToDoList from '../components/ToDoList';
import FetchList from '../components/FetchList';
import UserAuthentication from '../components/UserAuthentication'
import { newTodo, completeTodo, fetchList, postList, userLogin } from '../actions'

export default class App extends Component {
  render(){
    const { dispatch, allTodos, lists } = this.props;
    return (
      <div>
        { false &&
          <NewToDo onAddClick={text =>
            dispatch(postList(text))
          }/>
        }
        { false &&
          <ToDoList
            todos={allTodos}
            onTodoClick={index =>
              dispatch(completeTodo(index))
          }/>
        }
        { false &&
          <FetchList
            lists={lists}
            onFetchClick={type =>
              dispatch(fetchList(type))
          }/>
        }
        <UserAuthentication
          onLoginClick={user =>
            dispatch(userLogin(user))
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
