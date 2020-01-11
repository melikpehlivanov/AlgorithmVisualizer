import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from '../Navbar/NavMenu';

export class MainLayout extends Component {
  render () {
    return (
      <div>
        <NavMenu />
        <Container>
          {this.props.children}
        </Container>
      </div>
    );
  }
}

export default MainLayout;