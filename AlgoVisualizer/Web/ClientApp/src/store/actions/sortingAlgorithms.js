import {
  INITIALIZE_CHART_DATA,
  GENERATE_NEW_ARRAY
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
