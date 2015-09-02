export const NEW_TO_DO = "NEW_TO_DO";
export const COMPLETE_TO_DO = "COMPLETE_TO_DO";

export function newTodo(text) {
  return {type: "NEW_TO_DO", text}
}

export function completeTodo(index) {
  return {type: "COMPLETE_TO_DO", index}
}
