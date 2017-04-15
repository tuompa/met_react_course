import axios from '../axios';
import {
  START_USER_REQUEST,
  USER_REQUEST_SUCCESS,
  USER_REQUEST_ERROR,
  CLEAR_USER_ERROR,
  SET_USERS,
  REMOVE_USER,
  SELECT_USER,
  UNSELECT_USER,
  UPSERT_USER,
  CLEAR_USER_SUCCESS, } from './types';

function setPostRequestMessage({ dispatch, type, subject, message, }) {
  let before;
  let after;
  if (type ==='error') {
    before =USER_REQUEST_ERROR;
    after = CLEAR_USER_ERROR;
  } else {
    before = USER_REQUEST_SUCCESS;
    after = CLEAR_USER_SUCCESS;
  }
  dispatch({ type: before, payload: { subject, message, }, });
  setTimeout(() => dispatch({ type: after, payload: subject, }), 2000);
}

export function selectUser(userId) {
  return function (dispatch) {
    dispatch({ type: SELECT_USER, payload: userId, });
  };
}

export function unSelectUser() {
  return function (dispatch) {
    dispatch({ type: UNSELECT_USER, });
  };
}

export function getAllUsers() {
  return function (dispatch) {
    const subject = 'get_all_users';
    dispatch({ type: START_USER_REQUEST, payload: { subject, message: 'Fetching users', }, });
    return axios.get('/users')
        .then(({ data, }) => dispatch({ type: SET_USERS, payload: data, }))
        .then(() => setPostRequestMessage({ dispatch, type: 'success', subject, message: 'Users fetched', }))
        .catch((err) => {
          console.error(err);
          setPostRequestMessage({ dispatch, type: 'error', subject, message: 'Error while fetching users', });
        });
  };
}

export function createUser({ name, imageUrl, }) {
  return function (dispatch) {
    const subject = 'create_user';
    dispatch({ type: START_USER_REQUEST, payload: { subject, message: 'creating user', }, });
    axios.post('/users', { name, imageUrl, })
        .then(({ data, }) => dispatch({ type: UPSERT_USER, payload: data, }))
        .then(() => setPostRequestMessage({ type: 'success', dispatch, subject, message: 'user created', }))
        .catch(err => {
          console.error(err);
          setPostRequestMessage({ type: 'error', dispatch, subject, message: 'error on creating user', });
        });
  };
}

export function getUserById(userId) {
  return function (dispatch) {
    const subject = 'get_user_by_id';
    dispatch({ type: START_USER_REQUEST, payload: { subject, message: 'Fetching user', }, });
    axios.get(`/users/${userId}`)
        .then(({ data, }) => dispatch({ type: UPSERT_USER, payload: data, }))
        .then(() => setPostRequestMessage({ dispatch, type: 'success', subject, message: 'User fetched', }))
        .catch(err => {
          console.error(err);
          setPostRequestMessage({ dispatch, type: 'error', subject, message: 'error on fetching user', });
        });
  };
}


export function removeUser(userId) {
  return function (dispatch) {
    const subject = 'remove_user';
    dispatch({ type: START_USER_REQUEST, payload: { subject, message: 'Removing user', }, });
    axios.delete(`/users/${userId}`)
      .then(() => dispatch({ type: REMOVE_USER, payload: userId, }))
      .then(() => setPostRequestMessage({ dispatch, type: 'success', subject, message: 'User removed', }))
      .catch(err => {
        console.error(err);
        setPostRequestMessage({ dispatch, type: 'error', subject, message: 'Could not remove user', });
      });
  };
}
