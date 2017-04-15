import { combineReducers, } from 'redux';
import {
  UPSERT_USER,
  START_USER_REQUEST,
  USER_REQUEST_ERROR,
  USER_REQUEST_SUCCESS,
  CLEAR_USER_ERROR,
  SET_USERS,
  SELECT_USER,
  REMOVE_USER,
  UNSELECT_USER,
  CLEAR_USER_SUCCESS,
} from '../actions/types';

function request(state = { pending: {}, error: {}, success: {}, }, { type, payload, }) {
  switch (type) {
    case START_USER_REQUEST: {
      const pending = { ...state.pending, };
      const { subject, message, } = payload;
      pending[subject] = message;
      return { ...state, pending, };
    } case USER_REQUEST_SUCCESS: {
      const pending = { ...state.pending, };
      const { subject, message, } = payload;
      delete pending[subject];
      const success = { ...state.success, };
      success[subject] = message;
      return { ...state, pending, success, };
    } case CLEAR_USER_SUCCESS: {
      const success = { ...state.success, };
      delete success[payload];
      return { ...state, success, };
    } case USER_REQUEST_ERROR: {
      const error = { ...state.error, };
      const { subject, message, } = payload;
      error[subject] = message;
      return { ...state, error, };
    } case CLEAR_USER_ERROR: {
      const error = { ...state.error, };
      delete error[payload];
      return { ...state, error, };
    } default:
      return state;
  }
}

function content(state = { data: {}, selected: null, }, { type, payload, }) {
  switch (type) {
    case SET_USERS:
      return { ...state, data: payload, };
    case UPSERT_USER: {
      let { data, } = state;
      data = { ...data, [payload.id]: payload, };
      return { ...state, data, };
    } case SELECT_USER:
      return { ...state, selected: { ...state.data[payload], }, };
    case UNSELECT_USER:
      return { ...state, selected: null, };
    case REMOVE_USER: {
      const data = { ...state.data, };
      delete data[payload];
      return { ...state, data, };
    }
    default:
      return state;
  }
}

export default combineReducers({ content, request, });
