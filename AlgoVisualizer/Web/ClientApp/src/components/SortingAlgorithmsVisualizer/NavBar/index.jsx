import React, { Fragment, useState, useContext } from 'react';
import {
  Navbar,
  Nav,
  NavItem,
  Button,
  NavDropdown,
  ButtonToolbar,
  Spinner
} from 'react-bootstrap';
import { NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { SortingAlgorithmsContext } from '../../../store/sortingAlgorithms/context';
import {
  generateNewArray,
  setIsNavbarClickable,
  setTotalSwaps
} from '../../../store/sortingAlgorithms/actions';
import { ErrorContext } from '../../../store/error/context';
import { SORTING_ALGORITHMS_API_URL } from '../../../constants/algorithmConstants';
import { clearErrors, showError } from '../../../store/error/actions';
import { makePostApiCallAsync } from '../../../helpers/fetchData';
import { visualizeArrayElementsSwapping } from '../../../helpers/sortingAlgorithmsHelper';

const SortingAlgorithmsNavbar = () => {
  const [algorithm, setAlgorithm] = useState('');
  const { state, dispatch } = useContext(SortingAlgorithmsContext);
  const { dispatchError } = useContext(ErrorContext);
  const [showAlgorithmsMenu, setShowAlgorithmsMenu] = useState(false);

  const fetchData = async () => {
    dispatchError(clearErrors());

    const url = `${SORTING_ALGORITHMS_API_URL}/${algorithm.value}`;
    dispatch(setIsNavbarClickable(false));

    const data = JSON.stringify({
      Array: state.barChart.labels
    });

    const result = await makePostApiCallAsync(url, data, dispatchError);
    dispatch(setIsNavbarClickable(true));

    if (result) {
      if (result.isSuccess !== undefined && !result.isSuccess) {
        dispatchError(showError(result.messages));
        return;
      }

      await visualizeArrayElementsSwapping(
        dispatch,
        state.barChart,
        result.swapIndexes
      );
      dispatch(setTotalSwaps(result.totalSwaps));
    }
  };

  const isClickable = () => (!state.isNavbarClickable ? 'disabled' : '');

  const handleNewArrayGeneration = () => {
    if (state.isNavbarClickable) {
      dispatch(generateNewArray());
    }
  };

  return (
    <Fragment>
      <Navbar
        className="navbar-expand-sm navbar-toggleable-sm ng-white justify-content-between border-bottom box-shadow mb-3"
        bg="dark"
        expand="lg"
      >
        <Navbar.Brand className={isClickable()}>
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
              id="basic-nav-dropdown"
              className={isClickable()}
              title={<span className="text-white">Algorithms</span>}
              onMouseOver={() => setShowAlgorithmsMenu(true)}
              onMouseLeave={() => setShowAlgorithmsMenu(false)}
              show={showAlgorithmsMenu}
            >
              {state.algorithms.map((currentElement, index) => {
                return (
                  <NavDropdown.Item
                    key={index}
                    onClick={() => setAlgorithm(currentElement)}
                  >
                    {currentElement.label}
                  </NavDropdown.Item>
                );
              })}
            </NavDropdown>
          </Nav>
          <NavItem className="w-25 mb-2">
            {algorithm !== '' ? (
              <ButtonToolbar>
                <Button
                  className={isClickable()}
                  variant="primary"
                  onClick={() => fetchData()}
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
                      Visualizing...
                    </Fragment>
                  ) : (
                    `Visualize ${algorithm.label}`
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
                  variant="outline-danger"
                  onClick={() => handleNewArrayGeneration()}
                >
                  Generate New Data (Array)
                </Button>
              </NavItem>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Fragment>
  );
};

export default SortingAlgorithmsNavbar;
