import React, { createContext, useReducer } from 'react';
import gridReducer from '../reducers/grid';
import {
  START_NODE_ROW,
  START_NODE_COL,
  END_NODE_ROW,
  END_NODE_COL
} from '../../constants/gridConstants';
import { availablePathFindingAlgorithms } from '../../constants/algorithmConstants';

export const initialState = {
  isLoading: true,
  isNavbarClickable: true,
  grid: [],
  algorithms: availablePathFindingAlgorithms,
  algorithm: '',
  algorithmDescription: '',
  isWeightNodeAllowed: true,
  startNode: { row: START_NODE_ROW, col: START_NODE_COL, isStart: true },
  endNode: { row: END_NODE_ROW, col: END_NODE_COL, isEnd: true }
};

export const GridContext = createContext();

export const GridProvider = props => {
  const [state, dispatch] = useReducer(gridReducer, initialState);
  return (
    <GridContext.Provider value={{ state, dispatch }}>
      {props.children}
    </GridContext.Provider>
  );
};
