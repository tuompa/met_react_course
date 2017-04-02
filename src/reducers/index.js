import { combineReducers, } from 'redux';
import image from './imagesReducer';
import catBreed from './catBreed';

export default combineReducers({ image, catBreed, });
