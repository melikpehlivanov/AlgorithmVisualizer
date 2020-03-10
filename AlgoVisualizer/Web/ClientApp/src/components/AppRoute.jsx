import React, { Fragment } from 'react';
import { Route } from 'react-router';
import { MainLayout } from './Home/Layout';

export const AppRoute = ({
  component: Component,
  layout: Layout = MainLayout,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => (
      <Fragment>
        {Layout !== null ? (
          <Layout>
            <Component {...props} />
          </Layout>
        ) : (
          <Component {...props} />
        )}
      </Fragment>
    )}
  />
);
