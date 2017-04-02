import { ADD_BREED, REMOVE_BREED, MODIFY_BREED, } from '../actions/types';


const initialState = {
  1: { id: 1, name: 'Joona', },
  2: { id: 2, name: 'Kalle', },
};
let nextId = 3;
const { keys, } = Object;

export default function employees(state = initialState, { type, payload, }) {
  console.log(type);
  switch (type) {
  case ADD_BREED:
    /* expect payload to be a name
    * Copy the current state and add a new employee with a new id*/
    nextId++;
    return { ...state, [nextId]: { id: nextId, name: payload, }, };
  case MODIFY_BREED:
    /* expect payload to be object of shape {id: integer, name: string}
    Take a shallow copy of state and overrider evaluated value of payload.id*/
    return { ...state, [payload.id]: payload, };
  case REMOVE_BREED: {
    /* expect payload to be id of existing employee
    Take of shallow copy of state and filter out employee with id that matches payload */
    return keys(state)
      .filter(key => Number(key) !== payload)
      .reduce((acc, key) => ({ ...acc, [key]: state[key], }), {/* initial state for acc*/});
  }
  default:
    return state;
  }
}
