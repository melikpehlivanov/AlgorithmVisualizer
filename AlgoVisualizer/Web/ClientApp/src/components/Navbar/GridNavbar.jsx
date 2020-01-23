import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navbar, NavDropdown, Nav, NavItem, Button } from 'react-bootstrap';
import { NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import {
  setAlgorithm,
  setAlgorithmDescription,
  clearState,
  clearGrid
} from '../../actions';
import { makeApiCallAsync, visualizeResult } from '../../helpers/fetchData';
import { PATHFINDING_ALGORITHMS_API_URL } from '../../constants/algorithmConstants';

export class GridNavbar extends Component {
  handleOnClick(algorithm, algorithmDescription) {
    this.props.setAlgorithm(algorithm);
    this.props.setAlgorithmDescription(algorithmDescription);
  }

  async fetchData(algorithm, startNode, endNode, grid) {
    this.props.clearGrid();

    const url = `${PATHFINDING_ALGORITHMS_API_URL}/${algorithm}`;
    const result = await makeApiCallAsync(url, startNode, endNode, grid);
    const allVisitedNodesInOrder = result.allVisitedNodesInOrder;
    const allNodesInShortestPathOrder = result.allNodesInShortestPathOrder;
    visualizeResult(allVisitedNodesInOrder, allNodesInShortestPathOrder);
  }

  render() {
    const { algorithm, algorithms } = this.props;
    return (
      <Navbar
        className="navbar-expand-sm navbar-toggleable-sm ng-white justify-content-between border-bottom box-shadow mb-3"
        bg="dark"
        expand="lg"
      >
        <Navbar.Brand>
          <NavLink tag={Link} className="text-white" to="/">
            AlgoVisualizer
          </NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="w-50">
            <NavItem>
              <NavLink tag={Link} className="text-white" to="/">
                Home
              </NavLink>
            </NavItem>
            <NavDropdown
              title={<span className="text-white">Algorithms</span>}
              id="basic-nav-dropdown"
            >
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
          </Nav>
          <NavItem className="w-25 mb-2">
            {algorithm !== '' ? (
              <Button
                variant="success"
                onClick={e =>
                  this.fetchData(
                    this.props.algorithm,
                    this.props.startNode,
                    this.props.endNode,
                    this.props.grid
                  )
                }
              >
                Visualize {algorithm}
              </Button>
            ) : (
              ''
            )}
          </NavItem>
          <Nav className="w-50">
            <div className="ml-sm-auto">
              <NavItem>
                <Button variant="danger" onClick={this.props.clearState}>
                  Clear board
                </Button>
              </NavItem>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = state => {
  return {
    startNode: state.grid.startNode,
    endNode: state.grid.endNode,
    grid: state.grid.data,
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
    clearGrid: () => {
      dispatch(clearGrid());
    },
    clearState: () => {
      dispatch(clearState());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GridNavbar);
