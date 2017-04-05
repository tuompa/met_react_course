import {FETCH_TODOS,TODOS_REQUEST_ERROR,FETCH_TODOS_SUCCESS,POST_TODO,DELETE_TODO,} from '../actions/types';

const initialState = {
  isFetching: false,
  error: '',
  data: {},
};

export default function todos(state = initialState,{type,payload,}) {
  switch (type) {
  case FETCH_TODOS: {
    return {...state,isFetching: true,};
  }
  case TODOS_REQUEST_ERROR: { // TODO
    return state;
  }
  case FETCH_TODOS_SUCCESS: { // TODO
    return state;
  }
  case POST_TODO: { // TODO
    return state;
  }
  case DELETE_TODO: { // TODO
    return state;
  }
  default: return state;
  }
}
