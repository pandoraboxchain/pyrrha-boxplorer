import React from 'react';
import {
  Route,
  Switch,
  withRouter,
  IndexRoute,
  Redirect,
} from 'react-router-dom';
import { Header } from './common/components/Header';
import { WorkersComponent } from './common/components/Workers';
import { OneWorkerComponent } from './common/components/Worker';
import ExampleRouteHandler from './views/example';
import Workers from './views/workers';
import OneWorker from './views/worker';

import '../assets/fonts/fonts.css';

const JustAnotherPage = () => (
  <div>
    <h2>This is Just Another Page</h2>
    <p>Please remove this from your route, it is just to show case basic setup for router.</p>
  </div>
);

const HeaderWithRouter = withRouter(props => <Header {...props} />);
const WorkersWithRouter = withRouter(props => <WorkersComponent {...props} />);

module.exports = (
  <div className="container">
    <HeaderWithRouter />
    <div className="container__content">
      <Switch>
        <Route exact path="/" component={ExampleRouteHandler} />
        <Route path="/page" component={JustAnotherPage} />
        <Route path="/workers" component={WorkersComponent} />
        <Route path="/jobs" component={Workers} />
        <Route path="*" component={ExampleRouteHandler} />
      </Switch>
      <WorkersWithRouter />
      <Switch>
        <Route exact path="/workers" component={Workers} />
        <Route path="/workers/:id" component={OneWorker} />
      </Switch>
    </div>
  </div>
);
