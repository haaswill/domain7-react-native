'use strict';
import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from "redux-thunk";
import reducers from './reducers';
import Dashboard from './screens/Dashboard';

const store = createStore(
  reducers,
  applyMiddleware(thunk)
);

const App = () => (
  <Provider store={store}>
    <Dashboard />
  </Provider>
);

export default App;