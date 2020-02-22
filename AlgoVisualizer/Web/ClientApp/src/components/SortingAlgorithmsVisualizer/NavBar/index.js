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
import { SortingAlgorithmsContext } from '../../../store/context/sortingAlgorithmsContext';
import { generateNewArray } from '../../../store/actions/sortingAlgorithms';

//TODO: move it in separate file
const NavBar = () => {
  const [algorithm, setAlgorithm] = useState('');
  const { state, dispatch } = useContext(SortingAlgorithmsContext);

  return (
    <Fragment>
      <Navbar
        className="navbar-expand-sm navbar-toggleable-sm ng-white justify-content-between border-bottom box-shadow mb-3"
        bg="dark"
        expand="lg"
      >
        <Navbar.Brand>
          <NavLink tag={Link} className="text-white" to="/">
            SortingVisualizer
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
                    onClick={() => setAlgorithm(currentElement)}
                  >
                    {currentElement}
                  </NavDropdown.Item>
                );
              })}
            </NavDropdown>
          </Nav>
          <NavItem className="w-25 mb-2">
            {algorithm !== '' ? (
              <ButtonToolbar>
                <Button
                  className={!state.isNavbarClickable ? 'disabled' : ''}
                  variant="primary"
                  //onClick={() => TODO: make api request and visualize data}
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
                    `Visualize ${algorithm}`
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
                  variant="outline-danger"
                  onClick={() => dispatch(generateNewArray())}
                >
                  Generate New Array
                </Button>
              </NavItem>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Fragment>
  );
};

export default NavBar;
