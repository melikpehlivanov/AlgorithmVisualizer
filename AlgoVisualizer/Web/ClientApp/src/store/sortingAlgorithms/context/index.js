import React, { createContext, useReducer } from 'react';
import sortingAlgorithmsReducer from '../reducers';
import { availableSortingAlgorithms } from '../../../constants/algorithmConstants';

export const initialState = {
  isLoading: true,
  isNavbarClickable: true,
  algorithms: availableSortingAlgorithms,
  totalSwaps: '',
  barChart: {
    labels: [],
    datasets: [
      {
        label: 'Value',
        backgroundColor: [],
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: []
      }
    ]
  }
};

export const SortingAlgorithmsContext = createContext();

export const SortingAlgorithmsProvider = props => {
  const [state, dispatch] = useReducer(sortingAlgorithmsReducer, initialState);
  return (
    <SortingAlgorithmsContext.Provider value={{ state, dispatch }}>
      {props.children}
    </SortingAlgorithmsContext.Provider>
  );
};
