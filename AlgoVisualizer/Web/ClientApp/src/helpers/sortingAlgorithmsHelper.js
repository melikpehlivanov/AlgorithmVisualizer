const arraySize = 20;
const randomMultiplyingFactor = 300;

export const getInitialChart = data => {
  const dataSet = data.datasets[0];
  for (let i = 0; i <= arraySize; i++) {
    const number = Math.floor(Math.random() * randomMultiplyingFactor);
    data.labels.push(number);
    dataSet.data.push(number);
  }

  return data;
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

export const visualizeArrayElementsSwapping = (barChart, swappingIndexes) => {};
