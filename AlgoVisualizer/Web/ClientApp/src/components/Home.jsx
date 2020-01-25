import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

export class Home extends Component {
  render() {
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
              <p>Sorting algorithms - Currently being developed...</p>
            </ul>
          </li>
        </div>
      </Fragment>
    );
  }
}
