import { combineReducers } from 'redux';
import {COMPLETE_TO_DO, REQUEST_LIST, RECEIVE_LIST, POST_LIST, USER_LOGIN, LOGIN_FAILED, SEND_USER, POSTING, LIST_POSTED, LIST_UPDATED} from './actions';

function todos(state={
  isFetching: false,
  isPosting: false,
  items: []
}, action){
  switch(action.type){
  case REQUEST_LIST:
    return Object.assign({}, state, {
      isFetching: true
    });
  case RECEIVE_LIST:
    return Object.assign({}, state, {
      isFetching: false,
      items: action.list
    });
  case POSTING:
    return Object.assign({}, state, {
      isPosting: true
    });
  case LIST_POSTED:
    return {
      isPosting: false,
      items: [...state.items, {
        todo: action.list.todo,
        completed: action.list.completed
      }]
    }
  case LIST_UPDATED:
    return {
      isPosting: false
    }
  default:
    return state;
  }
}

function user(state={
  isLoggingin: false,
  Loggedin: false,
  info: []
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
      info: action.user
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
  user,
  todos
})
export default rootReducer;
