'use strict';
import { get } from '../handlers/api';
import {
  FETCH_ARTICLES_START,
  FETCH_ARTICLES_SUCCESS,
  FETCH_ARTICLES_FAIL
} from "./types";
import { formatDateToISO8601 } from '../handlers/formatter';

export const fetchArticles = (query, fromDate, toDate, source, page) => async dispatch => {
  try {
    dispatch({ type: FETCH_ARTICLES_START });
    let url = `everything?q=${query}`;
    url = fromDate ? url.concat(`&from=${formatDateToISO8601(fromDate)}`) : url;
    url = toDate ? url.concat(`&to=${formatDateToISO8601(toDate)}`) : url;
    url = source.value ? url.concat(`&sources=${source.id}`) : url;
    url = url.concat(`&page=${page}`);
    url = url.concat('&sortBy=popularity&');
    const { data: { articles, totalResults } } = await get(url);
    console.log(url)
    dispatch({ type: FETCH_ARTICLES_SUCCESS, payload: { articles, page } });
  } catch (error) {
    dispatch({ type: FETCH_ARTICLES_FAIL, payload: error });
  }
}