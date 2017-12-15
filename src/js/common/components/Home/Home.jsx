import React, { PureComponent } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { Table } from 'react-bootstrap';

import './Home.css';

class HomeComponent extends PureComponent {

  render() {
    const props = this.props;
    const result = props.example && props.example.result ? props.example.result : null;

    if (result && result.size && result.size > 0) {
      const serialized = result.toJS();
      return (
        <div className="HomeOutput">
          <pre>
            <div className="half">
              <h3>Workers</h3>
              {serialized.requestRaw.workers.map(worker => {
                return (
                  <Link to={`/workers/${worker.id}`}>
                    <div className="half_inner id">{worker.id}</div>
                    <div className="half_inner address">{worker.address}</div>
                    <div className="half_inner status">{worker.status}</div>
                  </Link>
                )
              })
            }
            <div className="home-gradient"></div>
          </div>
          <div className="half">
            <h3>Jobs</h3>
            {serialized.requestRaw.jobs.map(job => {
              return (
                <Link to={`/jobs/${job.id}`}>
                  <div className="half_inner id">{job.id}</div>
                  <div className="half_inner address">{job.jobAddress}</div>
                  <div className="half_inner status">{job.jobStatus}</div>
                </Link>
                )
              })
            }
            <div className="home-gradient"></div>
          </div>
          <div className="half">
            <h3>Kernels</h3>
            {serialized.requestRaw.kernels.map(kernel => {
              return (
                <Link to={`/kernels/${kernel.kernel}`}>
                  <div className="half_inner id">{kernel.kernel}</div>
                  <div className="half_inner address">{kernel.redis}</div>
                </Link>
              )
            })
          }
          <div className="home-gradient"></div>
        </div>
        <div className="half">
          <h3>Datasets</h3>
          {serialized.requestRaw.datasets.map(dataset => {
            return (
              <Link to={`/datasets/${dataset.dataset}`}>
                <div className="half_inner id">{dataset.dataset}</div>
                <div className="half_inner address">{dataset.redis}</div>
              </Link>
              )
            })
          }
          <div className="home-gradient"></div>
        </div>
        </pre>
      </div>
    );
  }
  return <div />;
}
}

export default HomeComponent;
