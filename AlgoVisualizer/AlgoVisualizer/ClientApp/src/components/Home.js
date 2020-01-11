import React, { Component, Fragment } from 'react';
import Grid from './Grid/Grid'
import { Link } from 'react-router-dom';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <Fragment>
        <div>
          <h1>Welcome to AlgoVisualizer!</h1>
          <p>Please choose one of the following algorithms</p>
          <li>
            <ul>
              <Link to='/pathfindingAlgorithms'>Pathfinding algorithms</Link>
            </ul>
            <ul>
              <Link to='/sortingAlgorithms'>Sorting algorithms</Link>
            </ul>
          </li>
        </div>
      </Fragment>
    );
  }
}
