import fetch from 'isomorphic-fetch';
import xhr from 'xhr';

export const NEW_TO_DO = "NEW_TO_DO";
export const COMPLETE_TO_DO = "COMPLETE_TO_DO";
export const REQUEST_LIST = "REQUEST_LIST";
export const RECEIVE_LIST = "RECEIVE_LIST";
export const POST_LIST = "POST_LIST";
export const USER_LOGIN = "USER_LOGIN";

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
    return fetch('http://localhost:3000/lists.json')
      .then(req => req.json())
      .then(json => dispatch(receiveList(list, json)))
  }
}

export function postList(text) {
  return dispatch => {
    dispatch(newTodo(text));
    return xhr({
      json: { todo: text, completed: false },
      uri: "http://localhost:3000/lists",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    }, function (err, resp, body) {
      console.log(err)
    })
  }
}

function userLogin(user) {
  return {type: "USER_LOGIN", user}
}

export function postUser(user){
  return dispatch  => {
    return xhr({
      json: {user: user},
      uri: "http://localhost:3000/users/sign_in",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    }, function (err, resp, body) {
      dispatch(userLogin(user))
    })
  }
}


//state shape
// {
//   newtodos: [
//     {todo: "love a dog", completed: true},
//     {todo: "study Korean", completed: false}
//   ]
//   fetchTodos: {
//     isFetching: false,
//     items: [
//       {todo: "love family", completed: true}
//     ]
//   }
//   postTodos: {
//     isPosting: false,
//     items: []
//   }
//   userLogin: {
//     isLoggingin: false,
//     Loggedin: true,
//     user: [
//       { email: "example@test.com", password: "password" }
//     ]
//   }
// }
