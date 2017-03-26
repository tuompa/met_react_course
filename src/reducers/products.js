import { ADD_PRODUCT, REMOVE_PRODUCT, MODIFY_PRODUCT } from '../actions/types';

export default function products(state = {
  products: [],
  loading: false,
}, { type, payload }) {
  switch (type) {
    case MODIFY_PRODUCT:
    case ADD_PRODUCT:
      return { ...state, [payload.id]: payload };
    case REMOVE_PRODUCT:
      return Object.keys(state)
        .filter(key => key !== payload)
        .reduce((acc, key) => ({ ...acc, [key]: state[key] }));
    default:
      return state;
  }
}
