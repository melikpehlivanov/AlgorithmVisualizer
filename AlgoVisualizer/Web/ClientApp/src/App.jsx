import React from 'react';
import { Switch, Redirect } from 'react-router';
import { Home } from './components/Home';
import Grid from './components/Grid/Grid';
import { GridLayout } from './components/Layouts/GridLayout/GridLayout';
import { SortingAlgorithmsLayout } from './components/SortingAlgorithmsVisualizer/Layout';
import SortingAlgorithmsContainer from './components/SortingAlgorithmsVisualizer/Container';

import AppRoute from './components/AppRoute';
import NotFound from './components/Error/NotFound';

const App = () => {
  return (
    <Switch>
      <AppRoute exact path="/" component={Home} />
      <AppRoute
        path="/pathfindingAlgorithms"
        component={Grid}
        layout={GridLayout}
      />
      <AppRoute
        path="/sortingAlgorithms"
        component={SortingAlgorithmsContainer}
        layout={SortingAlgorithmsLayout}
      />
      <AppRoute path="/404" component={NotFound} layout={null} />
      <Redirect to="/404" />
    </Switch>
  );
};

export default App;
