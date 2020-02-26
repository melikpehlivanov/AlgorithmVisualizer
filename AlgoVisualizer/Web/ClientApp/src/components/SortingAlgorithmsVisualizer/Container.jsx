import React, { useContext, useEffect, Fragment } from 'react';
import { Bar } from 'react-chartjs-2';
import { SortingAlgorithmsContext } from '../../store/sortingAlgorithms/context';
import { initializeChartData } from '../../store/sortingAlgorithms/actions';
import { Spinner } from 'react-bootstrap';

const SortingAlgorithmsContainer = () => {
  const { state, dispatch } = useContext(SortingAlgorithmsContext);

  useEffect(() => {
    dispatch(initializeChartData());
  }, [dispatch]);

  return (
    <Fragment>
      {state.isLoading ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <Bar data={state.barChart} height="100%" />
      )}
    </Fragment>
  );
};

export default SortingAlgorithmsContainer;
