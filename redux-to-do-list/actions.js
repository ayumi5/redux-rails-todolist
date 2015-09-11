import xhr from 'xhr';

export const COMPLETE_TO_DO = "COMPLETE_TO_DO";
export const REQUEST_LIST = "REQUEST_LIST";
export const RECEIVE_LIST = "RECEIVE_LIST";
export const POST_LIST = "POST_LIST";
export const POSTING = "POSTING";
export const USER_LOGIN = "USER_LOGIN";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const SEND_USER = "SEND_USER";
export const LIST_POSTED = "LIST_POSTED";
export const LIST_UPDATED = "LIST_UPDATED";

function userLogin(user) {
  return {type: "USER_LOGIN", user}
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

function posting(user){
  return {type: "POSTING", user}
}

function listPosted(list){
  return {type: "LIST_POSTED", list: list}
}

function listUpdated(list){
  return {type: "LIST_UPDATED", list: list}
}

function sendUser(user){
  return {type: "SEND_USER", user}
}

// export function completeTodo(index) {
//   return {type: "COMPLETE_TO_DO", index}
// }

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
    dispatch(posting(user));
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
        dispatch(listPosted(resp.body));
      }
    })
  }
}

export function completeTodo(id, user){
  return dispatch => {
    dispatch(posting(id));
    return xhr({
      json: {id: id, completed: true},
      uri: "http://localhost:3000/lists/" + id,
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        'Authorization': user.auth_token
      }
    }, function (err, resp, body) {
      if(resp.statusCode >= 300) {
        console.log(err)
      } else {
        dispatch(listUpdated(resp.body));
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
