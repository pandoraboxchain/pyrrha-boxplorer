import React, { PureComponent } from 'react';
import { Link, Route } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import Worker from '../../../views/workers/worker';

import './Workers.css';

class Workers extends PureComponent {
  render() {
    const props = this.props;
    const result = props.example && props.example.result ? props.example.result : null;

    if (result && result.size && result.size > 0) {
      const serialized = result.toJS();
      return (
        <div className="WorkersOutput">
          <pre>
            <div className="wHead">
              <div className="id">ID</div>
              <div className="address">Address</div>
              <div className="job">Job</div>
              <div className="wstatus">Worker Status</div>
              <div className="jstatus">Job Status</div>
            </div>
            <div className="workers-list">
              {serialized.requestRaw.workers.map(worker => {
                return (
                  <div>
                    <Route exact path="/workers" component={Workers} />
                    <Link to={`/workers/${worker.id}`} key="worker.id">
                      <div className="id">{worker.id}</div>
                      <div className="address">{worker.address}</div>
                      <div className="job">{worker.currentJob}</div>
                      <div className="wstatus">{worker.status}</div>
                      <div className="jstatus">{worker.currentJobStatus}</div>
                    </Link>
                    <Route path={`/workers/${worker.id}`} component={Worker} />
                    {console.log(<Route path={`/workers/${worker.id}`} component={Worker} />)}
                  </div>
                );
              })
            }
          </div>
        </pre>
      </div>


    );
  }
  return <div />;
}
}

export default Workers;
