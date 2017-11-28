import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { getSingleItem } from '../../../utility/singleCall'

import './Worker.css';

class OneWorkerComponent extends PureComponent {
  render() {
    const props = this.props;
    const result = props.example && props.example.result ? props.example.result : null;

    if (result && result.size && result.size > 0) {
      const serialized = result.toJS();
      const workerItem = getSingleItem(parseInt(props.match.params.id), serialized.requestRaw.workers);
      console.log(workerItem);
      return (
        <div className="WorkerOutput">
          <pre>
              <h1 className="title">Worker: {workerItem[0].address}</h1>
              <h1 className="status">Status: {workerItem[0].status}</h1>
              <div className="wjList">
                <ul>
                  <h2>Current job:</h2>
                  <li><Link to='/jobs'>{workerItem[0].currentJob}</Link></li>
                </ul>
                <ul>
                  <h2>Finished jobs:</h2>
                  <li><Link to='/jobs'>{workerItem[0].currentJob}</Link></li>
                </ul>
              </div>
          </pre>
        </div>


      );
    }
    return <div />;
  }
}

export default OneWorkerComponent;
