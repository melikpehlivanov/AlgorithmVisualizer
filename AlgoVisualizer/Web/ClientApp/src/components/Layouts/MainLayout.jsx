import React from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from '../Navbar/NavMenu';

const MainLayout = props => {
  return (
    <div>
      <NavMenu />
      <Container>{props.children}</Container>
    </div>
  );
};

export default MainLayout;
