import axios from '../axios';
import { UPDATE_TODO, FETCH_TODOS_SUCCESS, FETCH_TODOS, TODOS_REQUEST_ERROR, CREATE_TODO, DELETE_TODO, } from './types';

export function fetchTodos(userId) {
  return function (dispatch) {
    dispatch({ type: FETCH_TODOS, payload: userId, });
    return axios.get(`/users/${userId}/todos`)
      .then(({ data, }) => dispatch({ type: FETCH_TODOS_SUCCESS, payload: data, }))
      .catch(err => {
        console.error(err);
        dispatch({ type: TODOS_REQUEST_ERROR, payload: 'Fetch todos error', });
      });
  };
}

export function toggleTodoDone(todoId){
  return function(dispatch){
    console.error('toggleTodoDone not implemented');
  };
};

