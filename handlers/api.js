'use strict';
import axios from 'axios';
import { config } from '../config.js';

export const get = (query = '') => axios.get(`${config.apiUrl}/${query}apiKey=${config.apiKey}`);
