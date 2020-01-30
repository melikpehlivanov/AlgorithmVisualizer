import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <Fragment>
      <div>
        <h1>Welcome to AlgoVisualizer!</h1>
        <p>Please choose one of the following algorithms</p>
        <li>
          <ul>
            <Link to="/pathfindingAlgorithms">Pathfinding algorithms</Link>
          </ul>
          <ul>
            <p>Sorting algorithms - coming soon...</p>
          </ul>
        </li>
      </div>
    </Fragment>
  );
};
