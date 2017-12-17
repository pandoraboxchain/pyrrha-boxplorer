import React, { PureComponent } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { Table } from 'react-bootstrap';

import './Datasets.css';

class DatasetsComponent extends PureComponent {

  render() {
    const props = this.props;
    const result = props.example && props.example.result ? props.example.result : null;

    if (result && result.size && result.size > 0) {
      const serialized = result.toJS();
      return (
        <div className="DatasetsOutput">
          <pre>
            <div className="wHead">
              <div className="id">ID</div>
              <div className="address">Address</div>
              <div className="jstatus">Data Dimension</div>
            </div>
            <div className="datasets-list">
              {serialized.requestRaw.datasets.map(dataset => {
                return (
                  <div key={dataset.id}>
                    <Link to={`/datasets/${dataset.id}`}>
                      <div className="id">{dataset.id}</div>
                      <div className="address">{dataset.address}</div>
                      <div className="jstatus">{dataset.dim}</div>
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

export default DatasetsComponent;
