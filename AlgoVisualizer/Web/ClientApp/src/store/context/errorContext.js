import React, { createContext, useReducer } from 'react';
import errorReducer from '../reducers/error';

export const initialState = {
  messages: [],
  showError: false
};

export const ErrorContext = createContext();

export const ErrorProvider = props => {
  const [state, dispatchError] = useReducer(errorReducer, initialState);
  return (
    <ErrorContext.Provider value={{ state, dispatchError }}>
      {props.children}
    </ErrorContext.Provider>
  );
};
