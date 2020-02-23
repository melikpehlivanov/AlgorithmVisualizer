import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <Fragment>
      <div>
        <h1>Welcome to AlgoVisualizer!</h1>
        <p>Please choose one of the following algorithms visualizer</p>
        <ol>
          <li>
            <Link to="/pathfindingAlgorithms">
              Pathfinding algorithms visualizer
            </Link>
          </li>
          <li>
            <div>
              <Link to="/sortingAlgorithms">Sorting algorithms visualizer</Link>
              &nbsp; - Currently in beta version!
            </div>
          </li>
        </ol>
      </div>
    </Fragment>
  );
};
