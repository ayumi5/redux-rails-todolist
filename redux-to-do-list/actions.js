import xhr from 'xhr';

export const USER_LOGIN = "USER_LOGIN";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const SEND_USER = "SEND_USER";
export const REQUEST_LIST = "REQUEST_LIST";
export const RECEIVE_LIST = "RECEIVE_LIST";
export const POSTING = "POSTING";
export const RECEIVE_TODO = "RECEIVE_TODO";
export const COMPLETE_TODO = "COMPLETE_TODO";
export const USER_LOGOUT= "USER_LOGOUT";

function userLogin(user) {
  return {type: "USER_LOGIN", user}
}

function userLogout(user) {
  return {type: "USER_LOGOUT", user}
}

function loginFailed(user){
  return {type: "LOGIN_FAILED", user}
}

function requestList(user) {
  return {type: "REQUEST_LIST", user}
}

function receiveList(list) {
  return { type: "RECEIVE_LIST", list: list }
}

function posting(posting){
  return {type: "POSTING", posting}
}

function receiveTodo(list){
  return {type: "RECEIVE_TODO", list: list}
}

function completeTodo(index){
  return {type: "COMPLETE_TODO", index: index}
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

export function postTodo(text, user) {
  return dispatch => {
    dispatch(posting("true"));
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
        dispatch(receiveTodo(resp.body));
      }
    })
  }
}

export function completeList(list, user){
  return dispatch => {
    dispatch(posting("true"));
    return xhr({
      json: {id: list.id, completed: true},
      uri: "http://localhost:3000/lists/" + list.id,
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        'Authorization': user.auth_token
      }
    }, function (err, resp, body) {
      if(resp.statusCode >= 300) {
        console.log(err)
      } else {
        dispatch(completeTodo(list.index));
      }
    })
  }
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

export function deleteUser(user){
  return dispatch  => {
    dispatch(sendUser(user))
    user.email = ''
    user.password = ''
    user.auth_token = ''
    dispatch(userLogout(user))
  }
}
