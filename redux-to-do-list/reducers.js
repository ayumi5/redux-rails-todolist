import NEW_TO_DO from './actions';

const initialState = {
  todos: []
};

function newtodos(state = initialState, action) {
  switch (action.type) {
  case "NEW_TO_DO":
    return Object.assign({}, state, {
      todos: [...state.todos, {
        text: action.text,
        completed: false
      }]
    });
  case "COMPLETE_TO_DO":
    return Object.assign({}, state, {
      todos: [
        ...state.todos.slice(0, action.index),
        Object.assign({}, state.todos[action.index],{
          completed: true
        }),
        ...state.todos.slice(action.index + 1)
      ]
    });
    // return [...state, {
    //     text: action.text,
    //     completed: false
    // }];
  default:
    return state;
  }
}
export default newtodos;
