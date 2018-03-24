'use strict';
import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from "redux-thunk";
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/es/storage';
import reducers from './reducers';
import Dashboard from './screens/Dashboard';

const persistConfig = {
  key: 'root',
  storage
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = createStore(
  persistedReducer,
  applyMiddleware(thunk)
);

const persistor = persistStore(store);

persistor.purge();

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Dashboard />
    </PersistGate>
  </Provider>
);

export default App;