import React, { PureComponent } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { Table } from 'react-bootstrap';

import './Kernels.css';

class KernelsComponent extends PureComponent {

    render() {
        const props = this.props;
        const result = props.example && props.example.result ? props.example.result : null;

        if (result && result.size && result.size > 0) {
            const serialized = result.toJS();
            return (
                <div className="KernelsOutput">
                    <pre>
                        <div className="wHead">
                            <div className="id">ID</div>
                            <div className="address">Address</div>
                            <div className="jstatus">Data Dimension</div>
                        </div>
                        <div className="kernels-list">
                            {serialized.requestRaw.kernels.map(kernel => (
                                <div key={kernel.id}>
                                    <Link to={`/kernels/${kernel.id}`}>
                                        <div className="id">{kernel.id}</div>
                                        <div className="address">{kernel.address}</div>
                                        <div className="jstatus">{kernel.dim}</div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </pre>
                </div>
            );
        }
        return <div />;
    }
}

export default KernelsComponent;
