import { initialState } from '../context/sortingAlgorithmsContext';
import {
  INITIALIZE_CHART_DATA,
  GENERATE_NEW_ARRAY,
  SET_IS_NAVBAR_CLICKABLE,
  SET_BAR_CHART_ELEMENT_BACKGROUND_COLOR
} from '../../constants/sortingAlgorithmsConstants';
import {
  getInitialChart,
  generateNewChart,
  setBackgroundColorToChartElements
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
      const data = state.barChart;
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
    case SET_BAR_CHART_ELEMENT_BACKGROUND_COLOR:
      const barChart = state.barChart;
      return {
        ...state,
        barChart: Object.assign({}, barChart, {
          backgroundColor: Object.assign({}, barChart.backgroundColor, {
            backgroundColor: setBackgroundColorToChartElements(
              barChart,
              action.payload.elementsIndexes,
              action.payload.color
            )
          })
        })
      };
    default:
      return state;
  }
};

export default sortingAlgorithmsReducer;
