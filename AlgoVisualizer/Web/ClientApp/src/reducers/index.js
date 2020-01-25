import gridReducer from './grid';
import errorReducer from './error';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
  grid: gridReducer,
  error: errorReducer
});

export default allReducers;
