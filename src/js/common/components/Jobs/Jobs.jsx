import React, { PureComponent } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { Table } from 'react-bootstrap';

import './Jobs.css';

class JobsComponent extends PureComponent {

  render() {
    const props = this.props;
    const result = props.example && props.example.result ? props.example.result : null;

    if (result && result.size && result.size > 0) {
      const serialized = result.toJS();
      return (
        <div className="JobsOutput">
          <pre>
            <div className="wHead">
              <div className="id">ID</div>
              <div className="address">Address</div>
              <div className="jstatus">Job Status</div>
            </div>
            <div className="workers-list">
              {serialized.requestRaw.jobs.map(job => {
                return (
                  <div key={job.id}>
                    <Link to={`/jobs/${job.id}`}>
                      <div className="id">{job.id}</div>
                      <div className="address">{job.jobAddress}</div>
                      <div className="jstatus">{job.jobStatus}</div>
                    </Link>
                  </div>
                )
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

export default JobsComponent;
