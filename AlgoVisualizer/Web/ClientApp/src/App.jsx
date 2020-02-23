import React from 'react';
import { Switch, Redirect } from 'react-router';
import { Home } from './components/Home';
import PathFindingAlgorithmsLayout from './components/PathFindingAlgorithms/Layout';
import { SortingAlgorithmsLayout } from './components/SortingAlgorithmsVisualizer/Layout';
import SortingAlgorithmsContainer from './components/SortingAlgorithmsVisualizer/Container';

import AppRoute from './components/AppRoute';
import NotFound from './components/Error/NotFound';
import PathFindingAlgorithmsContainer from './components/PathFindingAlgorithms/Container';

const App = () => {
  return (
    <Switch>
      <AppRoute exact path="/" component={Home} />
      <AppRoute
        path="/pathfindingAlgorithms"
        component={PathFindingAlgorithmsContainer}
        layout={PathFindingAlgorithmsLayout}
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
