import {
  BAR_CHART_DEFAULT_BACKGROUND_COLOR,
  MARKED_ELEMENT_BACKGROUND_COLOR
} from '../constants/sortingAlgorithmsConstants';
import {
  setBarChartElementBackgroundColor,
  setIsNavbarClickable
} from '../store/sortingAlgorithms/actions';

const arraySize = 20;
const randomMultiplyingFactor = 300;

export const getInitialChart = () => {
  const barChart = {
    labels: [],
    dataset: {
      backgroundColor: [],
      data: []
    }
  };

  const dataSet = barChart.dataset;
  for (let i = 0; i <= arraySize; i++) {
    const number = Math.floor(Math.random() * randomMultiplyingFactor);
    dataSet.backgroundColor.push(BAR_CHART_DEFAULT_BACKGROUND_COLOR);
    barChart.labels.push(number);
    dataSet.data.push(number);
  }

  return barChart;
};

export const generateNewChart = data => {
  const dataSet = data.datasets[0];
  for (let i = 0; i <= arraySize; i++) {
    const number = Math.floor(Math.random() * randomMultiplyingFactor);
    data.labels[i] = number;
    dataSet.data[i] = number;
  }

  return data;
};

export const setBackgroundColorToChartElements = (
  barChart,
  elements,
  color
) => {
  const dataSet = barChart.datasets[0];
  for (let i = 0; i < elements.length; i++) {
    dataSet.backgroundColor[elements[i]] = color;
  }
  return barChart.backgroundColor;
};

export const visualizeArrayElementsSwapping = async (
  dispatch,
  barChart,
  swappingIndexes
) => {
  const timeOutMs = 500;

  dispatch(setIsNavbarClickable(false));

  for (let i = 0; i < swappingIndexes.length; i++) {
    const element = swappingIndexes[i];
    const firstIndex = element[0];
    const secondIndex = element[1];

    await Promise.all([
      dispatch(
        setBarChartElementBackgroundColor(
          [firstIndex, secondIndex],
          MARKED_ELEMENT_BACKGROUND_COLOR
        )
      ),
      timeout(timeOutMs)
    ]);

    await Promise.all([
      swapElements(barChart, firstIndex, secondIndex),
      timeout(250)
    ]);

    await Promise.all([
      dispatch(
        setBarChartElementBackgroundColor(
          [firstIndex, secondIndex],
          BAR_CHART_DEFAULT_BACKGROUND_COLOR
        )
      ),
      timeout(timeOutMs)
    ]);

    if (i === swappingIndexes.length - 1) {
      dispatch(setIsNavbarClickable(true));
    }
  }
};

const timeout = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

const swapElements = (barChart, firstIndex, secondIndex) => {
  const dataSet = barChart.datasets[0];

  const temp = barChart.labels[firstIndex];

  const secondElement = barChart.labels[secondIndex];
  barChart.labels[firstIndex] = secondElement;
  dataSet.data[firstIndex] = secondElement;

  barChart.labels[secondIndex] = temp;
  dataSet.data[secondIndex] = temp;
};
