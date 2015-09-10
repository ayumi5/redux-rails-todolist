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

function requestList(user) {
  return {type: "REQUEST_LIST", user}
}

function receiveList(list) {
  return { type: "RECEIVE_LIST", list: list }
}

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
      var list = JSON.parse(resp.body);
      dispatch(receiveList(list))
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
        //dispatch(newTodo(text));
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
        console.log(resp)
        user['auth_token'] = resp.body.auth_token
        dispatch(userLogin(user))
        dispatch(fetchList(user))
      }
    })
  }
}

//state shape
// {
//  fetchtodos: {
//    isFetching: false,
//    items: [
//      {todo: "love a dog", completed: true}
//    ]
//  }
//   newtodos: {
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
