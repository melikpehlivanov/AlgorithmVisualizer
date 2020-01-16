import React from 'react';
import {Navbar, NavDropdown, Nav, NavItem} from 'react-bootstrap';
import {NavLink} from 'reactstrap';
import { Link } from 'react-router-dom';

const algorithms = [
    { 
      value: 'astar', 
      label: 'A* Search', 
      description: 'A* Search is 𝐰𝐞𝐢𝐠𝐡𝐭𝐞𝐝 and 𝐠𝐮𝐚𝐫𝐚𝐧𝐭𝐞𝐞𝐬 the shortest path!',
      isWeight: true,
    },
    { 
      value: 'dijkstra', 
      label: "Dijkstra's Search", 
      description: "Dijkstra's Algorithm is 𝐰𝐞𝐢𝐠𝐡𝐭𝐞𝐝 and 𝐠𝐮𝐚𝐫𝐚𝐧𝐭𝐞𝐞𝐬 the shortest path!",
      isWeight: true,
    },
    { 
      value: 'bfs', 
      label: 'Breadth-first Search', 
      description: 'Breath-first Search is 𝐮𝐧𝐰𝐞𝐢𝐠𝐡𝐭𝐞𝐝 and 𝐠𝐮𝐚𝐫𝐚𝐧𝐭𝐞𝐞𝐬 the shortest path!',
      isWeight: false, 
    },
    { 
      value: 'dfs', 
      label: 'Depth-first Search', 
      description: 'Depth-first Search is 𝐮𝐧𝐰𝐞𝐢𝐠𝐡𝐭𝐞𝐝 and 𝐝𝐨𝐞𝐬 𝐧𝐨𝐭 𝐠𝐮𝐚𝐫𝐚𝐧𝐭𝐞𝐞 the shortest path!',
      isWeight: false, 
    }
];

export function GridNavbar(){
    return(
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" bg="light" expand="lg">
            <Navbar.Brand href="#home">AlgoVisualizer</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
                </NavItem>
                <NavDropdown title="Algorithms" id="basic-nav-dropdown">
                    {algorithms.map((currentElement, index) => {
                        return(
                          <NavDropdown.Item key={index}>
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