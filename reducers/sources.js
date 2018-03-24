'use strict';
import {
  FETCH_SOURCES_FAIL,
  FETCH_SOURCES_SUCCESS
} from '../actions/types';

const initialState = {
  sources: [],
  error: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SOURCES_SUCCESS:
      return {
        ...state,
        sources: action.payload
      };
    case FETCH_SOURCES_FAIL:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
}