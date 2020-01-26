import React, { Component } from 'react';
import { Switch, Redirect } from 'react-router';
import { Home } from './components/Home';
import Grid from './components/Grid/Grid';
import { GridLayout } from './components/Layouts/GridLayout/GridLayout';

import AppRoute from './components/AppRoute';
import NotFound from './components/Error/NotFound';

export default class App extends Component {
  render() {
    return (
      <Switch>
        <AppRoute exact path="/" component={Home} />
        <AppRoute
          path="/pathfindingAlgorithms"
          component={Grid}
          layout={GridLayout}
        />
        <AppRoute
          path="/404"
          component={NotFound}
          layout="non-existing-layout"
        />
        <Redirect to="/404" />
      </Switch>
    );
  }
}
