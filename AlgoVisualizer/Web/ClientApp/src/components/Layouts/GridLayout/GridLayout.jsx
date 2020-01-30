import React, { Fragment } from 'react';
import './GridLayout.css';
import GridNavbar from '../../Navbar/GridNavbar';
import Error from '../../Error';
import { GridProvider } from '../../../store/context/gridContext';
import { ErrorProvider } from '../../../store/context/errorContext';

export const GridLayout = props => {
  return (
    <GridProvider>
      <ErrorProvider>
        <Fragment>
          <GridNavbar />
          <Error />
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
          <div className="main-grid">{props.children}</div>
        </Fragment>
      </ErrorProvider>
    </GridProvider>
  );
};
