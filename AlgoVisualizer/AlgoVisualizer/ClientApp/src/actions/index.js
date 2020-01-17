import {
  SET_GRID,
  SET_ALGORITHM,
  SET_ALGORITHM_DESCRIPTION,
  CLEAR_STATE,
  REMOVE_WEIGHT_NODES
} from '../constants/gridConstants';

export const setGrid = grid => {
  return {
    type: SET_GRID,
    payload: grid
  };
};

export const setAlgorithm = algorithm => {
  return {
    type: SET_ALGORITHM,
    payload: algorithm
  };
};

export const setAlgorithmDescription = description => {
  return {
    type: SET_ALGORITHM_DESCRIPTION,
    payload: description
  };
};

export const clearState = () => {
  return {
    type: CLEAR_STATE
  };
};

export const removeWeightNodes = () => {
  return {
    type: REMOVE_WEIGHT_NODES
  };
};
