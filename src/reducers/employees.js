import { ADD_EMPLOYEE, REMOVE_EMPLOYEE, MODIFY_EMPLOYEE } from '../actions/types';

export default function employees(state = {}, { type, payload }) {
  switch (type) {
    case MODIFY_EMPLOYEE:
    case ADD_EMPLOYEE:
      return { ...state, [payload.id]: payload };
    case REMOVE_EMPLOYEE:
      const { [payload+'']:removed,  ...nextState } = state;
      return nextState;
    default:
      return state;
  }
}
