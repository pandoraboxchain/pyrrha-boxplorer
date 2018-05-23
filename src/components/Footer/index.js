import React from 'react';

import BoxproxyVersion from '../../containers/Boxproxy/BoxproxyVersion'
import { Container, Divider } from 'semantic-ui-react';
import './Footer.scss';

const Footer = (props) => (
    <div>
        <Divider />
        <Container>            
            <p className="pn-footer-test">Pandora Pyrrha Boxplorer v.{props.version}</p>
            <BoxproxyVersion />
        </Container>        
    </div>
);

export default Footer;
