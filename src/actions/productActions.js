import { ADD_PRODUCT, REMOVE_PRODUCT, MODIFY_PRODUCT } from './types';

let ids = 0;
export function addProduct(name) {
  return function (dispatch, getState) {
    const id = ids++;
    dispatch({
      type: ADD_PRODUCT,
      payload: {
        id, name,
      },
    });
  };
}

export function removeProduct(employee) {
  return function (dispatch, getState) {
    dispatch({
      type: REMOVE_PRODUCT,
      payload: employee.id,
    });
  };
}

export function modifyProduct(id, name) {
  return function (dispatch, getState) {
    dispatch({
      type: MODIFY_PRODUCT,
      payload: { id, name },
    });
  };
}

