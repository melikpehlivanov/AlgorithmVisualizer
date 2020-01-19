import React from 'react';
import { Route } from 'react-router'
import DefaultLayout from './Layouts/MainLayout'

const AppRoute = ({ component: Component, layout: Layout = DefaultLayout, ...rest }) => (
    <Route {...rest} render={props => (
      <Layout>
        <Component {...props} />
      </Layout>
    )} />
);

export default AppRoute;