import React, { useState, useEffect, Fragment } from 'react';
import { Button } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';

const SortingVisualizer = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const value = initializeArray();
    setData(value);
  }, []);

  const swapElements = chart => {
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

  return (
    <Fragment>
      <div>
        <Button>Generate New Array</Button>
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

const initializeArray = () => {
  const data = {
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
  };

  const dataSet = data.datasets[0];
  for (let i = 0; i <= 20; i++) {
    data.labels.push(i);
    dataSet.data.push(i);
  }

  return data;
};

export default SortingVisualizer;
