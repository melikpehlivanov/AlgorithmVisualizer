import React, { useContext, Fragment } from 'react';
import {
  Navbar,
  NavDropdown,
  Nav,
  NavItem,
  Button,
  ButtonToolbar,
  Spinner
} from 'react-bootstrap';
import { NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import {
  setAlgorithm,
  setAlgorithmDescription,
  clearState,
  setIsNavbarClickable,
  clearGrid
} from '../../../store/pathFindingAlgorithms/actions';
import { makePostApiCallAsync } from '../../../helpers/fetchData';
import {
  visualizeResult,
  visualizeMazeGeneration
} from '../../../helpers/pathFindingAlgorithms/dataVisualizer';
import {
  PATHFINDING_ALGORITHMS_API_URL,
  MAZE_TYPES,
  MAZE_API_URL
} from '../../../constants/algorithmConstants';
import { showError, clearErrors } from '../../../store/error/actions';
import { ErrorContext } from '../../../store/error/context';
import { PathFindingAlgorithmsContext } from '../../../store/pathFindingAlgorithms/context';

import './index.css';
import { DEFAULT_ERROR_MESSAGE } from '../../../constants/errorConstants';

const PathfindingAlgorithmsNavbar = () => {
  const { state, dispatch } = useContext(PathFindingAlgorithmsContext);
  const { dispatchError } = useContext(ErrorContext);

  const handleOnClick = (algorithm, algorithmDescription) => {
    if (!state.isNavbarClickable) return;
    dispatch(setAlgorithm(algorithm));
    dispatch(setAlgorithmDescription(algorithmDescription));
  };

  const handleMazeGeneration = async (grid, mazeType) => {
    if (!state.isNavbarClickable) return;

    dispatch(clearState());

    const url = `${MAZE_API_URL}/${mazeType}`;
    dispatch(setIsNavbarClickable(false));

    const data = JSON.stringify({
      grid
    });

    const result = await makePostApiCallAsync(url, data, dispatchError);
    dispatch(setIsNavbarClickable(true));

    if (result) {
      if (result.isSuccess === undefined && result.status == 400) {
        dispatchError(showError([DEFAULT_ERROR_MESSAGE]));
        return;
      }

      visualizeMazeGeneration(dispatch, result, mazeType);
    }
  };

  const fetchData = async (algorithm, startNode, endNode, grid) => {
    if (!state.isNavbarClickable) return;

    dispatch(clearGrid());
    dispatchError(clearErrors());

    const url = `${PATHFINDING_ALGORITHMS_API_URL}/${algorithm}`;
    dispatch(setIsNavbarClickable(false));

    const data = JSON.stringify({
      startNode: startNode,
      endNode: endNode,
      grid: grid
    });

    const result = await makePostApiCallAsync(url, data, dispatchError);

    dispatch(setIsNavbarClickable(true));

    if (result) {
      if (result.isSuccess !== undefined && !result.isSuccess) {
        dispatchError(showError(result.messages));
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
          <NavDropdown
            title={<span className="text-white">Mazes</span>}
            id="basic-nav-dropdown-2"
          >
            {MAZE_TYPES.map((currentElement, index) => {
              return (
                <NavDropdown.Item
                  key={index}
                  onClick={() =>
                    handleMazeGeneration(state.grid, currentElement.value)
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
            <ButtonToolbar>
              <Button
                className={isClickable()}
                variant="primary"
                onClick={() =>
                  fetchData(
                    state.algorithm,
                    state.startNode,
                    state.endNode,
                    state.grid
                  )
                }
              >
                {!state.isNavbarClickable ? (
                  <Fragment>
                    <Spinner
                      as="span"
                      animation="grow"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                    Loading...
                  </Fragment>
                ) : (
                  `Visualize ${state.algorithm}`
                )}
              </Button>
            </ButtonToolbar>
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

export default PathfindingAlgorithmsNavbar;
