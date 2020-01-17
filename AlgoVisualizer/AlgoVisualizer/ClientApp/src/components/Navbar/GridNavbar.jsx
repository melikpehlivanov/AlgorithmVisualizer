import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navbar, NavDropdown, Nav, NavItem, Button } from 'react-bootstrap';
import { NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

import {
  setAlgorithm,
  setAlgorithmDescription,
  clearState
} from '../../actions';

export class GridNavbar extends Component {
  handleOnClick(algorithm, algorithmDescription) {
    this.props.setAlgorithm(algorithm);
    this.props.setAlgorithmDescription(algorithmDescription);
  }

  render() {
    const { algorithm, algorithms } = this.props;
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
              {algorithms.map((currentElement, index) => {
                return (
                  <NavDropdown.Item
                    key={index}
                    onClick={() =>
                      this.handleOnClick(
                        currentElement.value,
                        currentElement.description
                      )
                    }
                  >
                    {currentElement.label}
                  </NavDropdown.Item>
                );
              })}
            </NavDropdown>
            <NavItem>
              {algorithm !== '' ? (
                <Button className='ml-3' variant='success'>
                  Visualize {algorithm}
                </Button>
              ) : (
                ''
              )}
            </NavItem>
            <NavItem>
              <Button variant='danger' onClick={this.props.clearState}>
                Clear board
              </Button>
            </NavItem>
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
    },
    setAlgorithmDescription: description => {
      dispatch(setAlgorithmDescription(description));
    },
    clearState: () => {
      dispatch(clearState());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GridNavbar);
