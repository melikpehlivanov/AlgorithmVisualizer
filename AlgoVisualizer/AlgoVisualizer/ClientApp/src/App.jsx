import React, { Component } from 'react';
import { Switch } from 'react-router';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import Grid from './components/Grid/Grid'
import {GridLayout} from './components/Layouts/GridLayout/GridLayout'

import './custom.css'
import AppRoute from './components/AppRoute';

export default class App extends Component {
  render () {
    return (
        <Switch>
          <AppRoute exact path='/' component={Home}/>
          <AppRoute path='/counter' component={Counter} />
          <AppRoute path='/pathfindingAlgorithms' component={Grid} layout={GridLayout}/>
          <AppRoute path='/fetch-data' component={FetchData}/>
        </Switch>
    );
  }
}
