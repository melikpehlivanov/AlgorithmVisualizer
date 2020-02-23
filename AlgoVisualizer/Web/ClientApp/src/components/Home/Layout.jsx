import React, { Fragment } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';

const MainLayout = props => {
  return (
    <Fragment>
      <NavMenu />
      <Container>{props.children}</Container>
    </Fragment>
  );
};

export default MainLayout;
