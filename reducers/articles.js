'use strict';
import {
  FETCH_ARTICLES_FAIL,
  FETCH_ARTICLES_START,
  FETCH_ARTICLES_SUCCESS,
  LOAD_MORE_ARTICLES_START,
  LOAD_MORE_ARTICLES_SUCCESS,
  LOAD_MORE_ARTICLES_FAIL
} from '../actions/types';
const initialState = {
  articles: [],
  error: {},
  loading: false,
  page: 1,
  refreshing: false
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
    case LOAD_MORE_ARTICLES_START:
      return {
        ...state,
        loading: true
      };
    case LOAD_MORE_ARTICLES_SUCCESS:
      return {
        ...state,
        articles: [...state.articles, ...action.payload.articles],
        page: action.payload.page,
        loading: false
      };
    case LOAD_MORE_ARTICLES_FAIL:
      return {
        ...state,
        ...initialState,
        error: action.payload,
        loading: false
      };
    default:
      return state;
  }
}