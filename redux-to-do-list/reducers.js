import { combineReducers } from 'redux';
import {NEW_TO_DO, COMPLETE_TO_DO, REQUEST_LIST, RECEIVE_LIST} from './actions';

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
        items: ['test']
        //items: action.list
      });
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  newtodos,
  lists
})
export default rootReducer;

//the state shape
//{
//  newtodos: [
//  {
//    text: "text",
//    completed: false
//  },
//  {
//    text: "another text",
//    completed: true
//  }
//],
//  lists: {
//    isFetching: true,
//    items: [
//      {
//        text: "items",
//        completed: true
//      }
//]
//}
//}
