import uuidV4 from 'uuid/v4';
import axios from '../axios';

import {
  START_USER_REQUEST,
  USER_REQUEST_SUCCESS,
  USER_REQUEST_ERROR,
  CLEAR_USER_ERROR,
  SET_USERS,
  REMOVE_USER,
  UPSERT_USER,
  CLEAR_USER_SUCCESS, } from './types';

export function getAllUsers() {
  return function (dispatch) {
    const subject = 'get_all_users';
    dispatch({ type: START_USER_REQUEST, payload: { subject, message: 'Fetching users', }, });
    return axios.get('/users')
        .then(({ data, }) => dispatch({ type: SET_USERS, payload: data, }))
        .then(() => setPostRequestMessage({ dispatch, type: 'success', subject, message: 'Users fetched', }))
        .catch((err) => {
          console.error(err);
          setPostRequestMessage({ dispatch, type: 'error', subject, });
        });
  };
}

export function createUser({ name, imageUrl, }) {
  return function (dispatch) {
    const subject = 'create_user';
    dispatch({ type: START_USER_REQUEST, payload: { subject, message: 'creating user', }, });
    const id = uuidV4();
    dispatch({ type: UPSERT_USER, payload: { id, name, imageUrl, pending: true, }, });
    axios.post('/users', { id, name, imageUrl, })
        .then(({ data, }) => dispatch({ type: UPSERT_USER, payload: data, }))
        .then(() => setPostRequestMessage({ type: 'success', dispatch, subject, message: 'user created', }))
        .catch(err => {
          console.error(err);
          dispatch({ type: REMOVE_USER, payload: id, });
          setPostRequestMessage({ type: 'error', dispatch, subject, });
        });
  };
}

export function removeUser(userId) {
  return function (dispatch, getState) {
    const subject = 'remove_user';
    const user = getState().users.content[userId];
    dispatch({ type: REMOVE_USER, payload: userId, });
    dispatch({ type: START_USER_REQUEST, payload: { subject, message: 'Removing user', }, });
    axios.delete(`/users/${userId}`)
      .then(() => setPostRequestMessage({ dispatch, type: 'success', subject, message: 'User removed', }))
      .catch(err => {
        console.error(err);
        dispatch({ type: UPSERT_USER, payload: user, });
        setPostRequestMessage({ dispatch, type: 'error', subject, });
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
          setPostRequestMessage({ dispatch, type: 'error', subject, });
        });
  };
}

function setPostRequestMessage({ dispatch, type, subject, message, }) {
  let before;
  let after;
  if (type ==='error') {
    before = USER_REQUEST_ERROR;
    after = CLEAR_USER_ERROR;
  } else {
    before = USER_REQUEST_SUCCESS;
    after = CLEAR_USER_SUCCESS;
  }
  dispatch({ type: before, payload: { subject, message: message || '(╯°□°)╯︵ ┻━┻', }, });
  setTimeout(() => dispatch({ type: after, payload: subject, }), 2000);
}