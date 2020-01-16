export const setGrid = grid => {
  return {
    type: 'SET_GRID',
    payload: grid
  };
};

export const setAlgorithm = algorithm => {
  return {
    type: 'SET_ALGORITHM',
    payload: algorithm
  };
};
