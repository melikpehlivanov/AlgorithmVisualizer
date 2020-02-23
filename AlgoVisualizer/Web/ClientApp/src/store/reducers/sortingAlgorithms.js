import { initialState } from '../context/sortingAlgorithmsContext';
import {
  INITIALIZE_CHART_DATA,
  GENERATE_NEW_ARRAY,
  SET_IS_NAVBAR_CLICKABLE
} from '../../constants/sortingAlgorithmsConstants';
import {
  getInitialChart,
  generateNewChart
} from '../../helpers/sortingAlgorithmsHelper';

const sortingAlgorithmsReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZE_CHART_DATA:
      return {
        ...state,
        barChart: getInitialChart(state.barChart),
        isLoading: false
      };
    case GENERATE_NEW_ARRAY:
      let data = state.barChart;
      return {
        ...state,
        barChart: Object.assign({}, data, {
          data: generateNewChart(data)
        })
      };
    case SET_IS_NAVBAR_CLICKABLE:
      return {
        ...state,
        isNavbarClickable: action.payload
      };
    default:
      return state;
  }
};

export default sortingAlgorithmsReducer;
