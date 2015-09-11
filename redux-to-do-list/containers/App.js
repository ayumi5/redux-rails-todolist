import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import NewToDo from '../components/NewToDo';
import ToDo from '../components/ToDo';
import ToDoList from '../components/ToDoList';
import FetchList from '../components/FetchList';
import UserAuthentication from '../components/UserAuthentication'
import { fetchList, postTodo, postUser, completeList } from '../actions'

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
              dispatch(completeList(list, user.info))
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
