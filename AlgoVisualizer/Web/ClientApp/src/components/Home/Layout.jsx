import React, { Fragment } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';

export const MainLayout = props => {
  return (
    <Fragment>
      <NavMenu />
      <Container>{props.children}</Container>
    </Fragment>
  );
};
