import {
  START_USER_REQUEST,
  USER_REQUEST_ERROR,
  USER_REQUEST_SUCCESS,
  CLEAR_USER_ERROR,
  SET_USERS,
  SELECT_USER,
  REMOVE_USER,
  UNSELECT_USER,
  UPDATE_USER,
  CLEAR_USER_SUCCESS,
} from '../actions/types';

const initialState = {
  pending: null,
  data: {},
  error: null,
  selected: null,
  success: null,
};
export default function user(state = initialState,{type,payload,}) {
  switch (type) {
  case START_USER_REQUEST:
    return {...state,pending: {payload,},};
  case USER_REQUEST_SUCCESS:
    return {...state,pending: null,success: payload,};
  case CLEAR_USER_SUCCESS:
    return {...state,success: null,};
  case USER_REQUEST_ERROR:
    return {...state,pending: false,error: payload,};
  case CLEAR_USER_ERROR:
    return {...state,error: null,};
  case SET_USERS:
    return {...state,data: payload,};
  case UPDATE_USER: {
    let {data,} = state;
    data = {...data,[payload.id]: payload,};
    return {...state,data,};
  } case SELECT_USER:
    return {...state,selected: {...state.data[payload],},};
  case UNSELECT_USER:
    return {...state,selected: null,};
  case REMOVE_USER: {
    const {[payload]: removed,...data} = state.data;
    return {...state,data,};
  } default:
    return state;
  }
}
