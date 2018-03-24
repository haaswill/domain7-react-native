'use strict';
import moment from 'moment';

export const formatDateToReadable = value => moment(value).format('MMM DD, YYYY hh:mm a');
export const formatDateToISO8601 = value => moment(value).format();