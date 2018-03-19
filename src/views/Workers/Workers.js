import React, { Component } from 'react';

import WorkersTable from '../../containers/WorkersTable/WorkersTable';

export default class Workers extends Component {

    render() {
        return (
            <div>
                <h3>Workers</h3>
                
                <WorkersTable />                
            </div>
        );
    }
}
