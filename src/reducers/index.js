import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import settings from './settings';
import web3Reducer from './web3Reducer'

const reducers = {
  routing: routerReducer,
  web3: web3Reducer,
  settings
};

module.exports = combineReducers(reducers);
