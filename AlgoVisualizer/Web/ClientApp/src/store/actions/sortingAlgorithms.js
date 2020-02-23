import {
  INITIALIZE_CHART_DATA,
  GENERATE_NEW_ARRAY,
  SET_IS_NAVBAR_CLICKABLE
} from '../../constants/sortingAlgorithmsConstants';

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
