import {
  INITIALIZE_CHART_DATA,
  GENERATE_NEW_ARRAY,
  SET_IS_NAVBAR_CLICKABLE,
  SET_BAR_CHART_ELEMENT_BACKGROUND_COLOR,
  SET_TOTAL_SWAPS
} from '../../../constants/sortingAlgorithmsConstants';

export const initializeChartData = () => {
  return {
    type: INITIALIZE_CHART_DATA
  };
};

export const generateNewArray = () => {
  return {
    type: GENERATE_NEW_ARRAY
  };
};

export const setIsNavbarClickable = isClickable => {
  return {
    type: SET_IS_NAVBAR_CLICKABLE,
    payload: isClickable
  };
};

export const setTotalSwaps = value => {
  return {
    type: SET_TOTAL_SWAPS,
    payload: value
  };
};

export const setBarChartElementBackgroundColor = (elementsIndexes, color) => {
  return {
    type: SET_BAR_CHART_ELEMENT_BACKGROUND_COLOR,
    payload: { elementsIndexes, color }
  };
};
