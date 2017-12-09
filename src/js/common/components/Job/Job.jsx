import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { getSingleItem } from '../../../utility/singleCall'

import './Job.css';

class OneJobComponent extends PureComponent {
  render() {
    const props = this.props;
    const result = props.example && props.example.result ? props.example.result : null;

    if (result && result.size && result.size > 0) {
      const serialized = result.toJS();
      const jobItem = getSingleItem(parseInt(props.match.params.id), serialized.requestRaw.jobs);
      return (
        <div className="JobOutput">
          <pre>
              <h1 className="title">Job: {jobItem[0].jobAddress}</h1>
              <h1 className="status">Status: {jobItem[0].jobStatus}</h1>
              <div className="wjList">
                <ul>
                  <h2>ipfs: {jobItem[0].ipfs}</h2>
                </ul>
              </div>
          </pre>
        </div>


      );
    }
    return <div />;
  }
}

export default OneJobComponent;
