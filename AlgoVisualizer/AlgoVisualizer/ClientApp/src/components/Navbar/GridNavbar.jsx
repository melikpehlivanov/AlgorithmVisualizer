import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navbar, NavDropdown, Nav, NavItem } from 'react-bootstrap';
import { NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

import { setAlgorithm } from '../../actions';

export class GridNavbar extends Component {
  render() {
    return (
      <Navbar
        className='navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3'
        bg='light'
        expand='lg'
      >
        <Navbar.Brand>
          <NavLink tag={Link} className='text-dark' to='/'>
            AlgoVisualizer
          </NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='mr-auto'>
            <NavItem>
              <NavLink tag={Link} className='text-dark' to='/'>
                Home
              </NavLink>
            </NavItem>
            <NavDropdown title='Algorithms' id='basic-nav-dropdown'>
              {this.props.algorithms.map((currentElement, index) => {
                return (
                  <NavDropdown.Item
                    key={index}
                    onClick={() =>
                      this.props.setAlgorithm(currentElement.value)
                    }
                  >
                    {currentElement.label}
                  </NavDropdown.Item>
                );
              })}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = state => {
  return {
    algorithms: state.grid.algorithms,
    algorithm: state.grid.algorithm
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setAlgorithm: algorithm => {
      dispatch(setAlgorithm(algorithm));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GridNavbar);
