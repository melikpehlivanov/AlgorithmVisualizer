import React, { Fragment } from 'react';
import { SortingAlgorithmsProvider } from '../../../store/sortingAlgorithms/context';
import { ErrorProvider } from '../../../store/error/context';
import { Error } from '../../Error';
import { SortingAlgorithmsNavbar } from '../NavBar';

export const SortingAlgorithmsLayout = props => {
  return (
    <SortingAlgorithmsProvider>
      <ErrorProvider>
        <Fragment>
          <SortingAlgorithmsNavbar />
          <Error />
          <div className="main-grid">{props.children}</div>
        </Fragment>
      </ErrorProvider>
    </SortingAlgorithmsProvider>
  );
};
