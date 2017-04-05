import axios from '../axios';
import {START_USER_REQUEST,
  USER_REQUEST_ERROR,
  USER_REQUEST_SUCCESS,
  CLEAR_USER_ERROR,
  SET_USERS,
  REMOVE_USER,
  SELECT_USER,
  UNSELECT_USER,
  UPDATE_USER,
  CLEAR_USER_SUCCESS,} from './types';


const {keys,} = Object;

export function getAllUsers() {
  return function (dispatch) {
    dispatch({type: START_USER_REQUEST,payload: 'Getting all profiles',});
    return axios.get('/users');
  };
}

export function getUserById(userId) {
  return function (dispatch) {
    dispatch({type: START_USER_REQUEST,payload: 'Fetching latest user data',});
    return axios.get(`/users/${userId}`);
  };
}

export function setUserRequestError(message) {
  return function (dispatch) {
    dispatch({type: USER_REQUEST_ERROR,payload: message,});
    setTimeout(()=>dispatch({type: CLEAR_USER_ERROR,}),2500);
  };
}

export function setUserRequestSuccess(message) {
  return function (dispatch) {
    dispatch({type: USER_REQUEST_SUCCESS,payload: message,});
    setTimeout(()=>dispatch({type: CLEAR_USER_SUCCESS,}),2500);
  };
}

export function setUsers(users) {
  return function (dispatch) {
    users = users.reduce((acc,next)=>({...acc,[next.id]: next,}),{});
    dispatch({type: SET_USERS,payload: users,});
  };
}

export function selectUser(userId) {
  return function (dispatch,getState) {
    dispatch({type: SELECT_USER,payload: userId,});
  };
}

export function unSelectUser(userId) {
  return function (dispatch) {
    dispatch({type: UNSELECT_USER,});
  };
}

export function requestUpdateUser() {
  return function (dispatch,getState) {
    const userId = getState().user.selected.id;
    return axios.put(`/users/${userId}`);
  };
}

export function updateUser(user) {
  return function (dispatch) {
    dispatch({type: UPDATE_USER,payload: user,});
  };
}

export function requestDeleteUser(userId) {
  return function (dispatch) {
    return axios.delete(`/users/${userId}`);
  };
}
export function removeUser(userId) {
  return function (dispatch,getState) {
    const {selected,} = getState().user;
    if (selected && selected.id === userId) {
      dispatch({type: UNSELECT_USER,});
    }
    dispatch({type: REMOVE_USER,payload: userId,});
  };
}
