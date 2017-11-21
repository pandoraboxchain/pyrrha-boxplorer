import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';

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
            <Table>
              <thead>
                <tr>
                  <th className="id">ID</th>
                  <th className="address">Address</th>
                  <th className="job">Job</th>
                  <th className="wstatus">Worker Status</th>
                  <th className="jstatus">Job Status</th>
                </tr>
              </thead>
            </Table>
            <div className="workers-list">
              {serialized.requestRaw.workers.map(worker => {
                return <Link to={`/workers/${worker.id}`} key="worker.id" className="worker-link">
                  <div className="id">{worker.id}</div>
                  <div className="address">{worker.address}</div>
                  <div className="job">{worker.currentJob}</div>
                  <div className="wstatus">{worker.status}</div>
                  <div className="jstatus">{worker.currentJobStatus}</div>
                </Link>
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
