import {
  START_NODE_ROW,
  START_NODE_COL,
  END_NODE_ROW,
  END_NODE_COL,
  INITIALIZE_GRID,
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
  data: [],
  algorithms: availableAlgorithms,
  algorithm: '',
  algorithmDescription: '',
  isWeightNodeAllowed: true,
  startNode: { row: START_NODE_ROW, col: START_NODE_COL },
  endNode: { row: END_NODE_ROW, col: END_NODE_COL }
};

let isGridChanged = false;

const gridReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZE_GRID:
      return { ...state, data: getInitialGrid(), isLoading: false };
    case SET_START_NODE:
      MarkGridAsChanged();

      return {
        ...state,
        data: setStartNode(
          action.payload.grid,
          action.payload.row,
          action.payload.col
        ),
        startNode: { row: action.payload.row, col: action.payload.col }
      };
    case SET_END_NODE:
      MarkGridAsChanged();

      return {
        ...state,
        data: setEndNode(
          action.payload.grid,
          action.payload.row,
          action.payload.col
        ),
        endNode: { row: action.payload.row, col: action.payload.col }
      };
    case SET_WEIGHT_NODE:
      MarkGridAsChanged();

      return {
        ...state,
        data: setWeightNode(
          action.payload.grid,
          action.payload.row,
          action.payload.col
        )
      };
    case SET_WALL_NODE:
      MarkGridAsChanged();

      return {
        ...state,
        data: setWallNode(
          action.payload.grid,
          action.payload.row,
          action.payload.col
        )
      };
    case SET_ALGORITHM:
      const algorithm = state.algorithms.find(
        el => el.value === action.payload
      );
      if (!algorithm || state.algorithm === action.payload) return state;

      return {
        ...state,
        algorithm: action.payload,
        isWeightNodeAllowed: algorithm.isWeight
      };
    case SET_ALGORITHM_DESCRIPTION:
      if (!action.payload || state.algorithm === action.payload) return state;
      return { ...state, algorithmDescription: action.payload };
    case CLEAR_STATE:
      if (!isGridChanged) return state;

      state = initialState;
      isGridChanged = false;

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

  function MarkGridAsChanged() {
    if (!isGridChanged) {
      isGridChanged = true;
    }
  }
};

export default gridReducer;
