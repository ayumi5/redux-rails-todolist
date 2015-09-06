import fetch from 'isomorphic-fetch';

export const NEW_TO_DO = "NEW_TO_DO";
export const COMPLETE_TO_DO = "COMPLETE_TO_DO";
export const REQUEST_LIST = "REQUEST_LIST"
export const RECEIVE_LIST = "REQUEST_LIST"

export function newTodo(text) {
  return {type: "NEW_TO_DO", text}
}

export function completeTodo(index) {
  return {type: "COMPLETE_TO_DO", index}
}

export function requestList(list) {
  return {type: "REQUEST_LIST", list}
}

export function receiveList(list, json) {
  return {
    type: "RECEIVE_LIST",
    list,
    list: json.data.children.map(child => child.data)
  };
}

export function fetchList(list) {
  return {type: "FETCH_LIST", list}
}

export function fetchList(list) {
  return dispatch => {
    dispatch(requestList(list));
    return fetch('http://localhost:3000/listings.json')
      .then(req => req.json())
      .then(json => dispatch(receiveList(list, json)))
  }
}
