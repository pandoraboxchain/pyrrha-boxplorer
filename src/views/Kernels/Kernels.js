import React, { Component } from 'react';

import KernelsTable from '../../containers/KernelsTable/KernelsTable';

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
