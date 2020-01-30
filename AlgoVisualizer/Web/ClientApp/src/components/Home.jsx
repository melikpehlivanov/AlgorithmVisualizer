import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <Fragment>
      <div>
        <h1>Welcome to AlgoVisualizer!</h1>
        <p>Please choose one of the following algorithms</p>
        <ol>
          <li>
            <Link to="/pathfindingAlgorithms">Pathfinding algorithms</Link>
          </li>
          <li>
            <p>Sorting algorithms - coming soon...</p>
          </li>
        </ol>
      </div>
    </Fragment>
  );
};
