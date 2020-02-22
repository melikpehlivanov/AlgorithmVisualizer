import { initialState } from '../context/sortingAlgorithmsContext';
import { INITIALIZE_CHART_DATA } from '../../constants/sortingAlgorithmsConstants';
import { getInitialChart } from '../../helpers/sortingAlgorithmsHelper';

const sortingAlgorithmsReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZE_CHART_DATA:
      return {
        ...state,
        barChart: getInitialChart(state.barChart),
        isLoading: false
      };
    default:
      return state;
  }
};

export default sortingAlgorithmsReducer;
