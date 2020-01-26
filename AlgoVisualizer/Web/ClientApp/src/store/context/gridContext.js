import React, { createContext } from 'react';

export const GridContext = createContext();

export const GridProvider = props => {
  return <GridContext.Provider>{props.children}</GridContext.Provider>;
};
