'use strict';
import {
  FETCH_ARTICLES_FAIL,
  FETCH_ARTICLES_START,
  FETCH_ARTICLES_SUCCESS
} from '../actions/types';
const initialState = {
  articles: [],
  error: {},
  refreshing: false,
  page: 1
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ARTICLES_START:
      return {
        ...state,
        refreshing: true
      };
    case FETCH_ARTICLES_SUCCESS:
      return {
        ...state,
        articles: action.payload.articles,
        page: action.payload.page,
        refreshing: false
      };
    case FETCH_ARTICLES_FAIL:
      return {
        ...state,
        ...initialState,
        error: action.payload,
        refreshing: false
      };
    default:
      return state;
  }
}