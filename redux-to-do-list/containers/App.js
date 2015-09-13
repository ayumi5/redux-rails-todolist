import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import NewToDo from '../components/NewToDo';
import ToDo from '../components/ToDo';
import ToDoList from '../components/ToDoList';
import FetchList from '../components/FetchList';
import UserAuthentication from '../components/UserAuthentication'
import LogOut from '../components/LogOut'
import { fetchList, postTodo, postComplete } from '../actions/list'
import { postUser, deleteUser } from '../actions/userSession'

export default class App extends Component {
  render(){
    const { dispatch, allTodos, user } = this.props;
    return (
      <div>
        { user.Loggedin &&
          <NewToDo
            user={user}
            onAddClick={text =>
            dispatch(postTodo(text, user.info))
          }/>
        }
        { user.Loggedin &&
          <ToDoList
            todos={allTodos}
            user={user}
            onTodoClick={list=>
              dispatch(postComplete(list, user.info))
          }/>
        }
        { user.Loggedin &&
          <LogOut
            onLogoutClick={ ()=>
              dispatch(deleteUser(user.info))
          }/>
        }
        { !user.Loggedin &&
          <UserAuthentication
            onLoginClick={user =>
              dispatch(postUser(user))
            }/>
        }
      </div>
    );
  }
}

function select(state){
  return {
    user: state.user,
    allTodos: state.todos
  };
}

export default connect(select)(App);
