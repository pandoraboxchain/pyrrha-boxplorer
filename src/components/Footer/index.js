import React from 'react';

import { Container, Divider } from 'semantic-ui-react';
import './Footer.scss';

const Footer = (props) => (
    <div>
        <Divider />
        <Container>            
            <p className="pn-footer-test">Pandora Pyrrha Boxplorer v.{props.version}</p>
        </Container>        
    </div>
);

export default Footer;
