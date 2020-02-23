import React, { Fragment } from 'react';
import { SortingAlgorithmsProvider } from '../../store/context/sortingAlgorithmsContext';
import { ErrorProvider } from '../../store/context/errorContext';
import Error from '../Error';
import NavBar from './NavBar';

export const SortingAlgorithmsLayout = props => {
  return (
    <SortingAlgorithmsProvider>
      <ErrorProvider>
        <Fragment>
          <NavBar />
          <Error />
          <div className="main-grid">{props.children}</div>
        </Fragment>
      </ErrorProvider>
    </SortingAlgorithmsProvider>
  );
};
