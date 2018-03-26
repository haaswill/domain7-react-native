'use strict';
import { get } from '../handlers/api';
import {
  FETCH_ARTICLES_START,
  FETCH_ARTICLES_SUCCESS,
  FETCH_ARTICLES_FAIL,
  LOAD_MORE_ARTICLES_START,
  LOAD_MORE_ARTICLES_SUCCESS,
  LOAD_MORE_ARTICLES_FAIL
} from "./types";
import { formatDateToISO8601 } from '../handlers/formatter';

const handleRequest = async (query, fromDate, toDate, source, page) => {
  let url = `everything?q=${query}`;
  url = fromDate ? url.concat(`&from=${formatDateToISO8601(fromDate)}`) : url;
  url = toDate ? url.concat(`&to=${formatDateToISO8601(toDate)}`) : url;
  url = source ? url.concat(`&sources=${source}`) : url;
  url = url.concat(`&page=${page}`);
  url = url.concat('&sortBy=popularity&');
  console.log(url)
  const { data: { articles } } = await get(url);
  return articles;
};

export const fetchArticles = (query, fromDate, toDate, source, page) => async dispatch => {
  try {
    dispatch({ type: FETCH_ARTICLES_START });
    const articles = await handleRequest(query, fromDate, toDate, source, page);
    dispatch({ type: FETCH_ARTICLES_SUCCESS, payload: { articles, page } });
  } catch (error) {
    dispatch({ type: FETCH_ARTICLES_FAIL, payload: error });
  }
}
export const loadMoreArticles = (query, fromDate, toDate, source, page) => async dispatch => {
  try {
    dispatch({ type: LOAD_MORE_ARTICLES_START });
    const articles = await handleRequest(query, fromDate, toDate, source, page);
    dispatch({ type: LOAD_MORE_ARTICLES_SUCCESS, payload: { articles, page } });
  } catch (error) {
    dispatch({ type: LOAD_MORE_ARTICLES_FAIL, payload: error });
  }
}