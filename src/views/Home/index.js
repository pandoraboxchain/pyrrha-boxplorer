import React, { Component } from 'react';

import Dashboard from '../../containers/Dashboard';

export default class Home extends Component {

    render() {
        return (
            <div>
                <Dashboard />
            </div>
        );
    }
}

export const route = {
    path: '/',
    exact: true,
    label: 'Home',
    component: Home
};
