import React, { Component } from 'react';

export default class Home extends Component {

    render() {
        return (
            <div>
                <h3>Hello</h3>
                
                
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
