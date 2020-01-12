import React, { Component, Fragment } from 'react';
import { NavMenu } from '../Navbar/NavMenu';

export class GridLayout extends Component {
  render () {
    return (
      <Fragment>
        <NavMenu />
        <div className="main-grid">
          {this.props.children}
        </div>
      </Fragment>
    );
  }
}

export default GridLayout;