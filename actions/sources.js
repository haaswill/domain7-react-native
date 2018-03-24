'use strict';
import { get } from '../handlers/api';
import {
  FETCH_SOURCES_SUCCESS,
  FETCH_SOURCES_FAIL
} from "./types";

export const fetchSources = () => async dispatch => {
  try {
    let formattedSources = [];
    const { data: { sources } } = await get('sources?');
    sources.forEach(source => {
      formattedSources.push({
        value: source.id,
        label: source.name
      });
    });
    dispatch({ type: FETCH_SOURCES_SUCCESS, payload: formattedSources });

  } catch (error) {
    dispatch({ type: FETCH_SOURCES_FAIL, payload: error });
  }
}