import { combineReducers } from 'redux';
import {REQUEST_LIST, RECEIVE_LIST, POSTING, RECEIVE_TODO, COMPLETE_TODO, PROCESS_USER, USER_LOGIN, LOGIN_FAILED, USER_LOGOUT} from './actions';

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
      isPosting: action.posting
    });
  case RECEIVE_TODO:
    return Object.assign({}, state, {
      isPosting: false,
      items: [...state.items, {
        id: action.list.id,
        todo: action.list.todo,
        completed: action.list.completed
      }]
    })
  case COMPLETE_TODO:
    return Object.assign({}, state, {
      isPosting: false,
      items: [
          ...state.items.slice(0, action.index),
          Object.assign({}, state.items[action.index], {
            completed: true
          }),
          ...state.items.slice(action.index + 1)
      ]
    })
  default:
    return state;
  }
}

function user(state={
  proceccing: false,
  Loggedin: false,
  info: []
}, action){
  switch(action.type){
  case PROCESS_USER:
    return Object.assign({}, state, {
      proceccing: true
    })
  case USER_LOGIN:
    return Object.assign({}, state, {
      proceccing: false,
      Loggedin: true,
      info: action.user
    });
  case LOGIN_FAILED:
    return Object.assign({}, state, {
      proceccing: false,
      Loggedin: false
    });
  case USER_LOGOUT:
    return Object.assign({}, state, {
      proceccing: false,
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
