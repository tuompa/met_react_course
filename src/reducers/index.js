import { combineReducers } from 'redux';
import employees from './employees';
import products from './products';

export default combineReducers({ employees, products });
