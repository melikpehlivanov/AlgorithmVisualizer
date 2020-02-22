import React, { Fragment } from 'react';
import { Route } from 'react-router';
import DefaultLayout from './Layouts/MainLayout';

const AppRoute = ({
  component: Component,
  layout: Layout = DefaultLayout,
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

export default AppRoute;
