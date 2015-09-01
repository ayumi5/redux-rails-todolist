export const NEW_TO_DO = 'NEW_TO_DO';

export function newTodo(text) {
  return {type: "NEW_TO_DO", text}
}
