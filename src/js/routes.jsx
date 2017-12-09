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
import { JobsComponent } from './common/components/Jobs';
import { OneJobComponent } from './common/components/Job';
import ExampleRouteHandler from './views/example';
import Home from './views/home';
import Workers from './views/workers';
import OneWorker from './views/worker';
import Jobs from './views/jobs';
import OneJob from './views/job';

import '../assets/fonts/fonts.css';

const notFound = () => (
  <div>
    <h2>404</h2>
    <p>Not found</p>
  </div>
);

const HeaderWithRouter = withRouter(props => <Header {...props} />);
const WorkersWithRouter = withRouter(props => <WorkersComponent {...props} />);
const JobsWithRouter = withRouter(props => <JobsComponent {...props} />);

module.exports = (
  <div className="container">
    <HeaderWithRouter />
    <div className="container__content">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/workers" component={WorkersComponent} />
        <Route path="/jobs" component={JobsComponent} />
        <Route path="*" component={notFound} />
      </Switch>
      <WorkersWithRouter />
      <Switch>
        <Route exact path="/workers" component={Workers} />
        <Route path="/workers/:id" component={OneWorker} />
      </Switch>
      <JobsWithRouter />
      <Switch>
        <Route exact path="/jobs" component={Jobs} />
        <Route path="/jobs/:id" component={OneJob} />
      </Switch>
    </div>
  </div>
);
