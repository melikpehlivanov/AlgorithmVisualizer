import React, { createContext, useReducer } from 'react';
import pathFindingAlgorithmsReducer from '../reducers';
import {
  START_NODE_ROW,
  START_NODE_COL,
  END_NODE_ROW,
  END_NODE_COL,
  TOTAL_NODES_EXPLORED_DEFAULT_VALUE
} from '../../../constants/gridConstants';
import { availablePathFindingAlgorithms } from '../../../constants/pathfindingAlgorithms';

export const initialState = {
  isLoading: true,
  isNavbarClickable: true,
  grid: [],
  totalNodesExplored: TOTAL_NODES_EXPLORED_DEFAULT_VALUE,
  algorithms: availablePathFindingAlgorithms,
  algorithm: '',
  algorithmDescription: '',
  isWeightNodeAllowed: true,
  startNode: { row: START_NODE_ROW, col: START_NODE_COL, isStart: true },
  endNode: { row: END_NODE_ROW, col: END_NODE_COL, isEnd: true }
};

export const PathFindingAlgorithmsContext = createContext();

export const PathFindingAlgorithmsProvider = props => {
  const [state, dispatch] = useReducer(
    pathFindingAlgorithmsReducer,
    initialState
  );
  return (
    <PathFindingAlgorithmsContext.Provider value={{ state, dispatch }}>
      {props.children}
    </PathFindingAlgorithmsContext.Provider>
  );
};
