import { combineReducers } from 'redux';
import {NEW_TO_DO, COMPLETE_TO_DO, REQUEST_LIST, RECEIVE_LIST, POST_LIST, USER_LOGIN, LOGIN_FAILED} from './actions';

function newtodos(state = [], action) {
  switch (action.type) {
  case NEW_TO_DO:
    return [...state, {
      text: action.text,
      completed: false
    }];
  case COMPLETE_TO_DO:
    return [
      ...state.slice(0, action.index),
      Object.assign({}, state[action.index], {
        completed: true
      }),
      ...state.slice(action.index + 1)
    ];
  default:
    return state;
  }
}

function lists(state={
  isFetching: false,
  items: []
}, action) {
  switch(action.type) {
  case REQUEST_LIST:
    return Object.assign({}, state, {
      isFetching: true
    });
  case RECEIVE_LIST:
    return Object.assign({}, state, {
      isFetching: false,
      items: action.list
    });
  case POST_LIST:
    return 'success!'
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
  newtodos,
  lists,
  login
})
export default rootReducer;
