import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import NewToDo from '../components/NewToDo';
import ToDo from '../components/ToDo';
import ToDoList from '../components/ToDoList';
import FetchList from '../components/FetchList';
import UserAuthentication from '../components/UserAuthentication'
import { completeTodo, fetchList, postList, postUser } from '../actions'

export default class App extends Component {
  render(){
    const { dispatch, allTodos, user } = this.props;
    return (
      <div>
        { user.Loggedin &&
          <NewToDo
            user={user}
            onAddClick={text =>
            dispatch(postList(text, user.info))
          }/>
        }
        { user.Loggedin &&
          <ToDoList
            todos={allTodos}
            onTodoClick={index =>
              dispatch(completeTodo(index))
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
