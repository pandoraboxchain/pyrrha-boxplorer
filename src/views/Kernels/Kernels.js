import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import KernelsTable from '../../containers/KernelsTable';

export default class Kernels extends Component {

    render() {
        return (
            <div>
                <h3>Kernels</h3>
                
                <KernelsTable />                
            </div>
        );
    }
}
