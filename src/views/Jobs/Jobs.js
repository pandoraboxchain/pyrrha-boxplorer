import React, { Component } from 'react';

import JobsTable from '../../containers/JobsTable/JobsTable';
import './Jobs.scss';

export default class Jobs extends Component {

    render() {
        return (
            <div>
                <h3>Jobs</h3>
                
                <JobsTable />                
            </div>
        );
    }
}
