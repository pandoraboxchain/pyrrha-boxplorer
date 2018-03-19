import 'semantic-ui-css/semantic.css';
import './App.scss';

import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import pack from '../../../package.json'

import { Container } from 'semantic-ui-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

import routes from '../../router';

export default class App extends Component {    
    render() {
        return (
            <div>
                <Header />
                <Container className="pn-content-panel">
                    <Switch>                    
                        {routes.map((route, index) => (
                            <Route
                                key={index}
                                path={route.path}
                                exact={route.exact}
                                component={route.component} />
                        ))}
                    </Switch>
                </Container>
                <Footer version={pack.version} />
            </div>
        );
    }
}
