import React, { Fragment } from 'react';
import './index.css';
import PathfindingAlgorithmsNavbar from '../Nav';
import Error from '../../Error';
import { PathFindingAlgorithmsProvider } from '../../../store/pathFindingAlgorithms/context';
import { ErrorProvider } from '../../../store/error/context';

const PathFindingAlgorithmsLayout = props => {
  return (
    <PathFindingAlgorithmsProvider>
      <ErrorProvider>
        <Fragment>
          <PathfindingAlgorithmsNavbar />
          <Error />
          <div className="main-grid">{props.children}</div>
        </Fragment>
      </ErrorProvider>
    </PathFindingAlgorithmsProvider>
  );
};

export default PathFindingAlgorithmsLayout;
