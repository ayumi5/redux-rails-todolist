import NEW_TO_DO from './actions';

function newtodos(state = [], action) {
  switch(action.type) {
  case NEW_TO_DO:
    return [...state, {
      text: action.text
    }];
  default:
    return state;
  }
}
export default newtodos;
