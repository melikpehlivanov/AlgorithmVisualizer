import {
  INITIALIZE_GRID,
  SET_IS_NAVBAR_CLICKABLE,
  SET_START_NODE,
  SET_END_NODE,
  SET_WEIGHT_NODE,
  SET_WALL_NODE,
  SET_ALGORITHM,
  SET_ALGORITHM_DESCRIPTION,
  CLEAR_STATE,
  REMOVE_WEIGHT_NODES,
  CLEAR_GRID,
  SET_TOTAL_NODES_EXPLORED
} from '../../../constants/gridConstants';

export const initializeGrid = () => {
  return {
    type: INITIALIZE_GRID
  };
};

export const setIsNavbarClickable = isClickable => {
  return {
    type: SET_IS_NAVBAR_CLICKABLE,
    payload: isClickable
  };
};

export const setStartNode = (row, col) => {
  return {
    type: SET_START_NODE,
    payload: { row, col }
  };
};

export const setEndNode = (row, col) => {
  return {
    type: SET_END_NODE,
    payload: { row, col }
  };
};

export const setWeightNode = (row, col) => {
  return {
    type: SET_WEIGHT_NODE,
    payload: { row, col }
  };
};

export const setWallNode = (row, col) => {
  return {
    type: SET_WALL_NODE,
    payload: { row, col }
  };
};

export const setTotalNodesExplored = value => {
  return {
    type: SET_TOTAL_NODES_EXPLORED,
    payload: value
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

export const clearGrid = () => {
  return {
    type: CLEAR_GRID
  };
};

export const removeWeightNodes = () => {
  return {
    type: REMOVE_WEIGHT_NODES
  };
};
