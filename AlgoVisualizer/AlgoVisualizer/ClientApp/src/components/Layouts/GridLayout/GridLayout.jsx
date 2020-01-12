import React, { Component, Fragment } from 'react';
import { NavMenu } from '../../Navbar/NavMenu';

import './GridLayout.css';

export class GridLayout extends Component {
  render () {
    return (
      <Fragment>
        <NavMenu />
        <div id="algo-legend">
          <ul>
            <li>
              <div className="node node-start"></div>
              Start Node
            </li>
            <li>
              <div className="node node-end"></div>
              End Node
            </li>
            <li>
              <div className="node node-wall"></div>
              Wall Node
            </li>
            <li>
              <i className="dumbbell"></i>
              Weight Node
            </li>
            <li>
              <div className="node"></div>
              Unvisited Node
            </li>
            <li>
              <div className="node node-visited"></div>
              Visited Node
            </li>
            <li>
              <div className="node node-shortest-path"></div>
              Shortest Path Node
            </li>
          </ul>
        </div>
        <div className="main-grid">
          {this.props.children}
        </div>
      </Fragment>
    );
  }
}

export default GridLayout;