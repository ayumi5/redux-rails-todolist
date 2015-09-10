import { combineReducers } from 'redux';
import {NEW_TO_DO, COMPLETE_TO_DO, REQUEST_LIST, RECEIVE_LIST, POST_LIST, USER_LOGIN, LOGIN_FAILED, SEND_USER} from './actions';

function fetchtodos(state={
  isFetching: false,
  todos: []
}, action) {
  switch(action.type) {
  case REQUEST_LIST:
    return Object.assign({}, state, {
      isFetching: true
    });
  case RECEIVE_LIST:
    return Object.assign({}, state, {
      isFetching: false,
      todos: action.list
    });
  default:
    return state
  }
}

function newtodos(state = [], action) {
  switch (action.type) {
  default:
    return state;
  }
}

function lists(state={
  isFetching: false,
  items: []
}, action) {
  switch(action.type) {
  default:
    return state;
  }
}

function login(state={
  isLoggingin: false,
  Loggedin: false,
  user: []
}, action){
  switch(action.type){
  case SEND_USER:
    return Object.assign({}, state, {
      isLoggingin: true
    })
  case USER_LOGIN:
    return Object.assign({}, state, {
      isLoggingin: false,
      Loggedin: true,
      user: action.user
    });
  case LOGIN_FAILED:
    return Object.assign({}, state, {
      isLoggingin: false,
      Loggedin: false
    });
  default:
    return state;
  }
}

const rootReducer = combineReducers({
  login,
  fetchtodos
})
export default rootReducer;
