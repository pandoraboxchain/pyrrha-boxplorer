import './Header.scss';

import React, { Component } from 'react';

import { Menu, Container, Icon, Responsive } from 'semantic-ui-react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import SocketStatus from '../../containers/SocketStatus';

import routes from '../../router';

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menu: false
        };
    }

    handleMenuBtnClick = () => {
        this.setState({
            menu: !this.state.menu
        });
    };

    render() {
        return (
            <div>
                <Container>
                    <Responsive as={Menu}  {...Responsive.onlyComputer}>
                        <Menu fixed="top" inverted stackable className="pn-header">                            
                            <Menu.Item header>
                            <div className="logo"></div><Link to="/"><h1 className="pn-head-title">Pyrrha Boxplorer</h1></Link>
                            </Menu.Item>            
                            {routes.map(route => (
                                <Menu.Item key={route.path.toString()}>
                                    <NavLink
                                        to={{ pathname: route.path, state: { prevPath: this.props.location.pathname } }}
                                        exact={route.exact} 
                                        className="pn-nav"
                                        activeClassName="selected">{route.label}</NavLink>
                                </Menu.Item>
                            ))}
                            <Menu.Item position="right" >
                                <SocketStatus />
                            </Menu.Item>                            
                        </Menu>
                    </Responsive>
                    <Responsive as={Menu} {...Responsive.onlyMobile}>
                        <Menu fixed="top" inverted stackable className="pn-header">                            
                            <Menu.Item as="div" header onClick={this.handleMenuBtnClick}>
                                <Icon className="pn-header-menu-btn" name="bars" />
                                <Link to="/"><h1 className="pn-head-title">Pyrrha Boxplorer</h1></Link>                            
                            </Menu.Item>            
                            {this.state.menu && 
                            routes.map(route => (
                                <Menu.Item key={route.path.toString()}>
                                    <NavLink
                                        to={{ pathname: route.path, state: { prevPath: this.props.location.pathname } }}
                                        exact={route.exact} 
                                        className="pn-nav" 
                                        onClick={this.handleMenuBtnClick} 
                                        activeClassName="selected">{route.label}</NavLink>
                                </Menu.Item>
                            ))}
                            {this.state.menu && 
                                <Menu.Item position="right" >
                                    <SocketStatus />
                                </Menu.Item>
                            }
                        </Menu>
                    </Responsive>
                    
                </Container>
            </div>
        )
    }
}

export default withRouter(Header);
