import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import NewToDo from '../components/NewToDo';
import ToDo from '../components/ToDo';
import ToDoList from '../components/ToDoList';
import FetchList from '../components/FetchList';
import UserAuthentication from '../components/UserAuthentication'
import { newTodo, completeTodo, fetchList, postList, postUser } from '../actions'

export default class App extends Component {
  render(){
    const { dispatch, allTodos, lists, login, user } = this.props;
    return (
      <div>
        { login.Loggedin &&
          <NewToDo
            user={user}
            onAddClick={text =>
            dispatch(postList(text, user))
          }/>
        }
        { login.Loggedin &&
          <ToDoList
            todos={allTodos}
            onTodoClick={index =>
              dispatch(completeTodo(index))
          }/>
        }
        { login.Loggedin &&
          <FetchList
            lists={lists}
            user={user}
            onFetchClick={user =>
              dispatch(fetchList(user))
          }/>
        }
        { !login.Loggedin &&
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
    allTodos: state.newtodos,
    lists: state.lists,
    login: state.login,
    user: state.login.user
  };
}

export default connect(select)(App);
