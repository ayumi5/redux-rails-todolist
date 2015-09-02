import {NEW_TO_DO, COMPLETE_TO_DO} from './actions';

const initialState = {
  todos: []
};

function newtodos(state = initialState, action) {
  switch (action.type) {
  case NEW_TO_DO:
    return Object.assign({}, state, {
      todos: [...state.todos, {
        text: action.text,
        completed: false
      }]
    });
  case COMPLETE_TO_DO:
    return Object.assign({}, state, {
      todos: [
        ...state.todos.slice(0, action.index),
        Object.assign({}, state.todos[action.index],{
          completed: true
        }),
        ...state.todos.slice(action.index + 1)
      ]
    });
  default:
    return state;
  }
}
export default newtodos;

//example
//{
//  todos: [{
//    text: 'Study Redux',
//    completed: true,
//}, {
//  text: 'Love Dog',
//  completed: false
//}, {
//  text: 'Testing',
//  completed: false
//}]
//}
//when dispatch with completeTodo action:
//store.dispatch(completeTodo(1));

//in Reducer:
//get all the objects before the target object
//...state.todos.slice(0, action.index)
//=>{text: 'Study Redux', completed: false}

//get the target object
//state.todos[action.index]
//=>{text: 'Love dog', completed: false}

//change the value of the target obejct
//Object.assign({}, state.todos[action.index],{
//  completed: true
//})
//=>{text: 'Love dog', completed: true}

//get the objects after the target object
//...state.todos.slice(action.index + 1)
//=>{text: 'Testing', completed: false}
