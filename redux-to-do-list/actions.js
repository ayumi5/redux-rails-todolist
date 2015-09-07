import fetch from 'isomorphic-fetch';
import xhr from 'xhr';

export const NEW_TO_DO = "NEW_TO_DO";
export const COMPLETE_TO_DO = "COMPLETE_TO_DO";
export const REQUEST_LIST = "REQUEST_LIST";
export const RECEIVE_LIST = "RECEIVE_LIST";
export const POST_LIST = "POST_LIST";

export function newTodo(text) {
  return {type: "NEW_TO_DO", text}
}

export function completeTodo(index) {
  return {type: "COMPLETE_TO_DO", index}
}

function requestList(list) {
  return {type: "REQUEST_LIST", list}
}

function receiveList(list, json) {
  return {
    type: "RECEIVE_LIST",
    list,
    list: json
  };
}

export function fetchList(list) {
  return dispatch => {
    dispatch(requestList(list));
    return fetch('http://localhost:3000/listings.json')
      .then(req => req.json())
      .then(json => dispatch(receiveList(list, json)))
  }
}

export function postList(text) {
  return dispatch => {
    dispatch(newTodo(text));
    return xhr({
      json: { todo: text, completed: false },
      uri: "http://localhost:3000/listings",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    }, function (err, resp, body) {
      console.log(err)
    })
  }
}
