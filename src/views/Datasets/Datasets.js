import React, { Component } from 'react';

import DatasetsTable from '../../containers/DatasetsTable/DatasetsTable';

export default class Datasets extends Component {

    render() {
        return (
            <div>
                <h3>Datasets</h3>
                
                <DatasetsTable />                
            </div>
        );
    }
}
