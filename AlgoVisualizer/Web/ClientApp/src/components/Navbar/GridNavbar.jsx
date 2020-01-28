import React, { useContext } from 'react';
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
import { ErrorContext } from '../../store/context/errorContext';
import { GridContext } from '../../store/context/gridContext';

import './GridNavbar.css';

const GridNavbar = () => {
  const { state, dispatch } = useContext(GridContext);
  const { dispatchError } = useContext(ErrorContext);

  const handleOnClick = (algorithm, algorithmDescription) => {
    if (!state.isNavbarClickable) return;
    dispatch(setAlgorithm(algorithm));
    dispatch(setAlgorithmDescription(algorithmDescription));
  };

  const fetchData = async (algorithm, startNode, endNode, grid) => {
    if (!state.isNavbarClickable) return;

    dispatch(clearGrid());
    dispatch(clearErrors());

    const url = `${PATHFINDING_ALGORITHMS_API_URL}/${algorithm}`;
    const result = await makePostApiCallAsync(
      url,
      startNode,
      endNode,
      grid,
      dispatchError
    );

    if (result) {
      if (result.isSuccess !== undefined && !result.isSuccess) {
        dispatchError(showError(true, result.messages));
        return;
      }
      const allVisitedNodesInOrder = result.allVisitedNodesInOrder;
      const allNodesInShortestPathOrder = result.allNodesInShortestPathOrder;
      visualizeResult(
        dispatch,
        allVisitedNodesInOrder,
        allNodesInShortestPathOrder
      );
    }
  };

  const isClickable = () => (!state.isNavbarClickable ? 'disabled' : '');

  return (
    <Navbar
      className="navbar-expand-sm navbar-toggleable-sm ng-white justify-content-between border-bottom box-shadow mb-3"
      bg="dark"
      expand="lg"
    >
      <Navbar.Brand className={!state.isNavbarClickable ? 'disabled' : ''}>
        <NavLink tag={Link} className="text-white" to="/">
          AlgoVisualizer
        </NavLink>
      </Navbar.Brand>
      <Navbar.Toggle className="bg-white" aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="w-50">
          <NavItem className={isClickable()}>
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
              className={isClickable()}
              variant={state.isNavbarClickable ? 'success' : 'danger'}
              onClick={() =>
                fetchData(
                  state.algorithm,
                  state.startNode,
                  state.endNode,
                  state.grid
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
              <Button
                className={isClickable()}
                variant="danger"
                onClick={() =>
                  state.isNavbarClickable ? dispatch(clearState()) : null
                }
              >
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
