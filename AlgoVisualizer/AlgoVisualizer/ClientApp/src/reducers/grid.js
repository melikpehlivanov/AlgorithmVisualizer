import {
  SET_GRID,
  SET_START_NODE,
  SET_END_NODE,
  SET_WEIGHT_NODE,
  SET_WALL_NODE,
  SET_ALGORITHM,
  SET_ALGORITHM_DESCRIPTION,
  CLEAR_STATE,
  REMOVE_WEIGHT_NODES
} from '../constants/gridConstants';

import {
  getInitialGrid,
  setStartNode,
  setEndNode,
  setWeightNode,
  setWallNode,
  removeAllWeightNodes
} from '../helpers/gridHelper';

import { availableAlgorithms } from '../constants/algorithmConstants';

const initialState = {
  isLoading: true,
  data: getInitialGrid,
  algorithms: availableAlgorithms,
  algorithm: '',
  algorithmDescription: '',
  isWeightNodeAllowed: true
};

const gridReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_GRID:
      return { ...state, data: action.payload, isLoading: false };
    case SET_START_NODE:
      return {
        ...state,
        data: setStartNode(
          action.payload.grid,
          action.payload.row,
          action.payload.col
        )
      };
    case SET_END_NODE:
      return {
        ...state,
        data: setEndNode(
          action.payload.grid,
          action.payload.row,
          action.payload.col
        )
      };
    case SET_WEIGHT_NODE:
      return {
        ...state,
        data: setWeightNode(
          action.payload.grid,
          action.payload.row,
          action.payload.col
        )
      };
    case SET_WALL_NODE:
      return {
        ...state,
        data: setWallNode(
          action.payload.grid,
          action.payload.row,
          action.payload.col
        )
      };
    case SET_ALGORITHM:
      let algorithm = state.algorithms.find(el => el.value === action.payload);
      if (algorithm) {
        return {
          ...state,
          algorithm: action.payload,
          isWeightNodeAllowed: algorithm.isWeight
        };
      }
      break;
    case SET_ALGORITHM_DESCRIPTION:
      if (action.payload) {
        return { ...state, algorithmDescription: action.payload };
      }
      break;
    case CLEAR_STATE:
      state = initialState;

      return {
        ...state,
        data: getInitialGrid(),
        isLoading: false
      };
    case REMOVE_WEIGHT_NODES:
      let newGrid = removeAllWeightNodes(state.data);
      return {
        ...state,
        data: newGrid
      };
    default:
      return state;
  }
};

export default gridReducer;
