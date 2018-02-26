import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { getSingleItem } from '../../../utility/singleCall'

import './Dataset.css';

class OneDatasetComponent extends PureComponent {
    render() {
        const props = this.props;
        const result = props.example && props.example.result ? props.example.result : null;

        if (result && result.size && result.size > 0) {
            const serialized = result.toJS();
            const datasetItem = getSingleItem(parseInt(props.match.params.id), serialized.requestRaw.datasets);
            return (
                <div className="DatasetOutput">
                    <pre>
                        <h1 className="title">Dataset: {datasetItem[0].address}</h1>
                        <h1 className="status">Dimension: {datasetItem[0].dataDim}</h1>
                        <div className="wjList">
                            <ul>
                                <h2>Batches: {datasetItem[0].batchesCount}</h2>
                                <h2>Samples: {datasetItem[0].samplesCount}</h2>
                                <h2>Price: {datasetItem[0].currentPrice}</h2>
                                <h2>IPFS model: {datasetItem[0].ipfsAddress}</h2>
                            </ul>
                        </div>
                    </pre>
                </div>
            );
        }
        return <div />;
    }
}

export default OneDatasetComponent;
