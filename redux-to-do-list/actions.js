import xhr from 'xhr';

export const NEW_TO_DO = "NEW_TO_DO";
export const COMPLETE_TO_DO = "COMPLETE_TO_DO";
export const REQUEST_LIST = "REQUEST_LIST";
export const RECEIVE_LIST = "RECEIVE_LIST";
export const POST_LIST = "POST_LIST";
export const USER_LOGIN = "USER_LOGIN";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const SEND_USER = "SEND_USER";

export function newTodo(text) {
  return {type: "NEW_TO_DO", text}
}

export function completeTodo(index) {
  return {type: "COMPLETE_TO_DO", index}
}

function requestList(list) {
  return {type: "REQUEST_LIST", list}
}

function receiveList(json) {
  return { type: "RECEIVE_LIST", list: json} }

function sendUser(user){
  return {type: "SEND_USER", user}
}

export function fetchList(user){
  return dispatch => {
    dispatch(requestList(user));
    return xhr({
      uri: 'http://localhost:3000/lists.json',
      headers: {'Authorization': user.auth_token}
    }, function (err, resp, body) {
      dispatch(receiveList(resp.body))
    });
  }
}

export function postList(text, user) {
  return dispatch => {
    return xhr({
      json: { todo: text, completed: false },
      uri: "http://localhost:3000/lists",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': user.auth_token
      }
    }, function (err, resp, body) {
      if(resp.statusCode >= 300) {
        console.log(err)
      } else {
        dispatch(newTodo(text));
      }
    })
  }
}

function userLogin(user) {
  return {type: "USER_LOGIN", user}
}

function loginFailed(user){
  return {type: "LOGIN_FAILED", user}
}

export function postUser(user){
  return dispatch  => {
    dispatch(sendUser(user))
    return xhr({
      json: { user },
      uri: "http://localhost:3000/authenticate",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    }, function (err, resp, body) {
      if(resp.statusCode >= 300) {
        dispatch(loginFailed(user))
      } else {
        user['auth_token'] = resp.body.auth_token
        dispatch(userLogin(user))
        dispatch(fetchList(user))
      }
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
//   login: {
//     isLoggingin: false,
//     Loggedin: true,
//     users: [
//       { email: "example@test.com", password: "password", auth_token: "fdafdjkaffdhgadjkfajdkla3d2" }
//     ]
//
//   }
// }
