import React from 'react';

import BoxproxyVersion from '../../containers/Boxproxy/BoxproxyVersion'
import { Container, Divider } from 'semantic-ui-react';
import './Footer.scss';

const Footer = (props) => (
    <div className="pn-footer">
        <Divider />
        <Container>            
            <div className="bp-ver">
                <a href={`https://github.com/pandoraboxchain/pyrrha-boxplorer/tree/v${props.version}`}>Boxplorer v{props.version}</a>                
            </div>
            <BoxproxyVersion className="bp-ver" />
        </Container>        
    </div>
);

export default Footer;
