import {ADD_BREED,REMOVE_BREED,MODIFY_BREED,} from '../actions/types';


const initialState = {
  1: {id: 1,name: 'cheezburger',img: 'https://img.memesuper.com/d2eee997fefac6a426ba8807c275e482_the-rise-of-image-memes-i-can-haz-cheezburger-meme_570-595.jpeg',},
  2: {id: 2,name: 'Cat2',img: 'http://sharesloth.com/wp-content/uploads/2014/07/kcRUogc.jpg',},
};
let nextId = 3;
const {keys,} = Object;

export default function employees(state = initialState,{type,payload,}) {
  switch (type) {
  case ADD_BREED:
    /* expect payload to be a name
    * Copy the current state and add a new employee with a new id*/
    nextId++;
    return {...state,[nextId]: {id: nextId,name: payload,},};
  case MODIFY_BREED:
    /* expect payload to be object of shape {id: integer, name: string}
    Take a shallow copy of state and overrider evaluated value of payload.id*/
    return {...state,[payload.id]: payload,};
  case REMOVE_BREED: {
    /* expect payload to be id of existing employee
    Take of shallow copy of state and filter out employee with id that matches payload */
    return keys(state)
      .filter(key=>Number(key) !== payload)
      .reduce((acc,key)=>({...acc,[key]: state[key],}),{/* initial state for acc*/});
  }
  default:
    return state;
  }
}
