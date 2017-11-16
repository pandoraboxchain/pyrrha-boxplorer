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
              <tbody>
                {serialized.requestRaw.workers.map(worker => {
                  return <tr key="worker">
                    <th className="id">{worker.id}</th>
                    <th className="address">{worker.address}</th>
                    <th className="job">{worker.currentJob}</th>
                    <th className="wstatus">{worker.status}</th>
                    <th className="jstatus">{worker.currentJobStatus}</th>
                  </tr>
                })
              }
            </tbody>
          </Table>
        </pre>
      </div>


    );
  }
  return <div />;
}
}

export default Workers;
