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
import { KernelsComponent } from './common/components/Kernels';
import { OneKernelComponent } from './common/components/Kernel';
import { DatasetsComponent } from './common/components/Datasets';
import { OneDatasetComponent } from './common/components/Dataset';
import ExampleRouteHandler from './views/example';
import Home from './views/home';
import Workers from './views/workers';
import OneWorker from './views/worker';
import Jobs from './views/jobs';
import OneJob from './views/job';
import Kernels from './views/kernels';
import OneKernel from './views/kernel';
import Datasets from './views/datasets';
import OneDataset from './views/dataset';

import '../assets/fonts/fonts.css';

const notFound = () => (
  <div>
    <h2>404</h2>
    <p>Not found</p>
  </div>
);

const soon = () => (
  <div>Coming Soon</div>
);

const HeaderWithRouter = withRouter(props => <Header {...props} />);
const WorkersWithRouter = withRouter(props => <WorkersComponent {...props} />);
const JobsWithRouter = withRouter(props => <JobsComponent {...props} />);
const KernelsWithRouter = withRouter(props => <KernelsComponent {...props} />);
const DatasetsWithRouter = withRouter(props => <DatasetsComponent {...props} />);

module.exports = (
  <div className="container">
    <HeaderWithRouter />
    <div className="container__content">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/workers" component={WorkersComponent} />
        <Route path="/jobs" component={JobsComponent} />
        <Route path="/kernels" component={KernelsComponent} />
        <Route path="/datasets" component={DatasetsComponent} />
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
      <KernelsWithRouter />
      <Switch>
        <Route exact path="/kernels" component={Kernels}/>
        <Route path="/kernels/:id" component={OneKernel}/>
      </Switch>
      <DatasetsWithRouter />
      <Switch>
        <Route exact path="/datasets" component={Datasets}/>
        <Route path="/datasets/:id" component={OneDataset}/>
      </Switch>
    </div>
  </div>
);
