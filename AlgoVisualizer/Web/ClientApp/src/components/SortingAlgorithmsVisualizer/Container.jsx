import React, { useContext, useEffect, Fragment } from 'react';
import { Bar } from 'react-chartjs-2';
import { SortingAlgorithmsContext } from '../../store/sortingAlgorithms/context';
import { initializeChartData } from '../../store/sortingAlgorithms/actions';
import { Spinner } from 'react-bootstrap';

export const SortingAlgorithmsContainer = () => {
  const { state, dispatch } = useContext(SortingAlgorithmsContext);
  useEffect(() => {
    dispatch(initializeChartData());
  }, [dispatch]);

  return (
    <Fragment>
      {state.totalSwaps !== 0 ? (
        <div className="d-flex pb-3 justify-content-center">
          <p className="mr-1">Total swaps:</p>
          <p>{state.totalSwaps}</p>
        </div>
      ) : (
        ''
      )}
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
