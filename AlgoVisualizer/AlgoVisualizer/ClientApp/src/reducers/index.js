import gridReducer from './grid';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
  grid: gridReducer
});

export default allReducers;
