import React, { useState, useEffect, Fragment } from 'react';
import { Button } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';

const arraySize = 20;
const randomMultiplyingFactor = 300;

const SortingVisualizer = () => {
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Value',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: []
      }
    ]
  });

  useEffect(() => {
    initializeData(data);
  }, []);

  const initializeData = () => {
    const dataSet = data.datasets[0];
    for (let i = 0; i <= arraySize; i++) {
      const number = Math.floor(Math.random() * randomMultiplyingFactor);
      data.labels.push(number);
      dataSet.data.push(number);
    }

    setData({ ...data, labels: data.labels, datasets: data.datasets });
  };

  const swapElements = () => {
    // Swapping is hard coded for now
    let dataCopy = data;
    let temp = dataCopy.labels[1];
    let dataSet = dataCopy.datasets[0];

    dataCopy.labels[1] = dataCopy.labels[3];
    dataSet.data[1] = dataCopy.labels[3];

    dataCopy.labels[3] = temp;
    dataSet.data[3] = temp;

    setData(
      Object.assign({}, data, {
        data: dataCopy
      })
    );
  };

  const generateNewArray = () => {
    const dataSet = data.datasets[0];
    for (let i = 0; i <= arraySize; i++) {
      const number = Math.floor(Math.random() * randomMultiplyingFactor);
      data.labels[i] = number;
      dataSet.data[i] = number;
    }

    setData(
      Object.assign({}, data, {
        data: data
      })
    );
  };

  return (
    <Fragment>
      <div>
        <Button onClick={() => generateNewArray()}>Generate New Array</Button>
        <Button>Merge Sort</Button>
        <Button>Bubble Sort</Button>
        <Button>Heap Sort</Button>
        <Button>Quick Sort</Button>
        <Button onClick={() => swapElements()}>Test</Button>
      </div>
      <div>
        <Bar data={data} height="100%" />
      </div>
    </Fragment>
  );
};

export default SortingVisualizer;
