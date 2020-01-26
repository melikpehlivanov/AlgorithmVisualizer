import {
  INITIALIZE_GRID,
  SET_START_NODE,
  SET_END_NODE,
  SET_WEIGHT_NODE,
  SET_WALL_NODE,
  SET_ALGORITHM,
  SET_ALGORITHM_DESCRIPTION,
  CLEAR_STATE,
  CLEAR_GRID,
  REMOVE_WEIGHT_NODES
} from '../../constants/gridConstants';

import {
  getInitialGrid,
  setStartNode,
  setEndNode,
  setWeightNode,
  setWallNode,
  removeAllWeightNodes,
  clearGrid
} from '../../helpers/gridHelper';
import { initialState } from '../context/gridContext';

let isGridChanged = false;

const gridReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZE_GRID:
      return { ...state, grid: getInitialGrid(), isLoading: false };
    case SET_START_NODE:
      MarkGridAsChanged();

      return {
        ...state,
        grid: setStartNode(
          action.payload.grid,
          action.payload.row,
          action.payload.col
        ),
        startNode: {
          row: action.payload.row,
          col: action.payload.col,
          isStart: true
        }
      };
    case SET_END_NODE:
      MarkGridAsChanged();

      return {
        ...state,
        grid: setEndNode(
          action.payload.grid,
          action.payload.row,
          action.payload.col
        ),
        endNode: {
          row: action.payload.row,
          col: action.payload.col,
          isEnd: false
        }
      };
    case SET_WEIGHT_NODE:
      MarkGridAsChanged();

      return {
        ...state,
        grid: setWeightNode(
          action.payload.grid,
          action.payload.row,
          action.payload.col
        )
      };
    case SET_WALL_NODE:
      MarkGridAsChanged();

      return {
        ...state,
        grid: setWallNode(
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
      clearGrid();

      return {
        ...state,
        grid: getInitialGrid(),
        isLoading: false
      };
    case CLEAR_GRID:
      if (state.grid.length === 0) return state;
      MarkGridAsChanged();
      clearGrid();
      return state;
    case REMOVE_WEIGHT_NODES:
      let newGrid = removeAllWeightNodes(state.data);
      return {
        ...state,
        grid: newGrid
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
