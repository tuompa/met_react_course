import { ADD_EMPLOYEE, REMOVE_EMPLOYEE, MODIFY_EMPLOYEE } from './types';

let ids = 0;
export function addEmployee(name) {
  return function (dispatch, getState) {
    const id = ids++;
    dispatch({
      type: ADD_EMPLOYEE,
      payload: {
        id, name,
      },
    });
  };
}

export function removeEmployee(employee) {
  return function (dispatch, getState) {
    dispatch({
      type: REMOVE_EMPLOYEE,
      payload: employee.id,
    });
  };
}

export function modifyEmployee(id, name) {
  return function (dispatch, getState) {
    dispatch({
      type: MODIFY_EMPLOYEE,
      payload: { id, name },
    });
  };
}
