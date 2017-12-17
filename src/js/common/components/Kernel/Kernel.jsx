import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { getSingleItem } from '../../../utility/singleCall'

import './Kernel.css';

class OneKernelComponent extends PureComponent {
  render() {
    const props = this.props;
    const result = props.example && props.example.result ? props.example.result : null;

    if (result && result.size && result.size > 0) {
      const serialized = result.toJS();
      const kernelItem = getSingleItem(parseInt(props.match.params.id), serialized.requestRaw.kernels);
      return (
        <div className="KernelOutput">
          <pre>
              <h1 className="title">Kernel: {kernelItem[0].address}</h1>
              <h1 className="status">Dimension: {kernelItem[0].dim}</h1>
              <div className="wjList">
                <ul>
                  <h2>Complexity: {kernelItem[0].complexity}</h2>
                  <h2>Price: {kernelItem[0].price}</h2>
                  <h2>IPFS model: {kernelItem[0].ipfs}</h2>
                </ul>
              </div>
          </pre>
        </div>


      );
    }
    return <div />;
  }
}

export default OneKernelComponent;
