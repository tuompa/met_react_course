import {combineReducers,} from 'redux';
import image from './imagesReducer';
import catBreed from './catBreed';
import user from './user';
import todo from './todo';

export default combineReducers({image,catBreed,user,todo,});
