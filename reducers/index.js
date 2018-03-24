'use strict';
import { combineReducers } from 'redux';
import articlesReducer from './articles';
import sourcesReducer from './sources';

export default combineReducers({
  articlesReducer,
  sourcesReducer
});