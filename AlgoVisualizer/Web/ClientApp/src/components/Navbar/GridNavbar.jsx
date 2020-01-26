import React, { useReducer, useContext } from 'react';
import { Navbar, NavDropdown, Nav, NavItem, Button } from 'react-bootstrap';
import { NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import {
  setAlgorithm,
  setAlgorithmDescription,
  clearState,
  clearGrid
} from '../../store/actions/grid';
import { makePostApiCallAsync, visualizeResult } from '../../helpers/fetchData';
import { PATHFINDING_ALGORITHMS_API_URL } from '../../constants/algorithmConstants';
import { showError, clearErrors } from '../../store/actions/error';
import gridReducer, { initialState } from '../../store/reducers/grid';
import { ErrorContext } from '../../store/context/errorContext';
import { GridContext } from '../../store/context/gridContext';

const GridNavbar = () => {
  const { state, dispatch } = useContext(GridContext);
  const { dispatchError } = useContext(ErrorContext);

  console.log(state);
  const handleOnClick = (algorithm, algorithmDescription) => {
    dispatch(setAlgorithm(algorithm));
    dispatch(setAlgorithmDescription(algorithmDescription));
  };

  const fetchData = async (algorithm, startNode, endNode, grid) => {
    dispatch(clearGrid());
    dispatch(clearErrors());

    const url = `${PATHFINDING_ALGORITHMS_API_URL}/${algorithm}`;
    const result = await makePostApiCallAsync(url, startNode, endNode, grid);

    if (result) {
      if (result.isSuccess !== undefined && !result.isSuccess) {
        dispatchError(showError(true, result.messages));
        return;
      }
      const allVisitedNodesInOrder = result.allVisitedNodesInOrder;
      const allNodesInShortestPathOrder = result.allNodesInShortestPathOrder;
      visualizeResult(allVisitedNodesInOrder, allNodesInShortestPathOrder);
    }
  };

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
      <Navbar.Toggle className="bg-white" aria-controls="basic-navbar-nav" />
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
            {state.algorithms.map((currentElement, index) => {
              return (
                <NavDropdown.Item
                  key={index}
                  onClick={() =>
                    handleOnClick(
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
          {state.algorithm !== '' ? (
            <Button
              variant="success"
              onClick={() =>
                fetchData(
                  state.algorithm,
                  state.startNode,
                  state.endNode,
                  state.data
                )
              }
            >
              Visualize {state.algorithm}
            </Button>
          ) : (
            ''
          )}
        </NavItem>
        <Nav className="w-50">
          <div className="ml-sm-auto">
            <NavItem>
              <Button variant="danger" onClick={() => dispatch(clearState())}>
                Clear board
              </Button>
            </NavItem>
          </div>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default GridNavbar;
