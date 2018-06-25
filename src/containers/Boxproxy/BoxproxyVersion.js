import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as selectors from '../../store/selectors';

class BoxproxyVersion extends PureComponent {

    render() {
        const { isConnected, version } = this.props;

        return (
            <div>
                {isConnected &&
                    <p className="pn-footer-test">
                        <a href={`https://github.com/pandoraboxchain/pyrrha-boxproxy/tree/v${version}`}>Boxproxy v{version}</a>
                    </p>    
                }
                {!isConnected &&
                    <p className="pn-footer-test">Waiting for Pyrrha Boxproxy...</p>
                }
            </div>
        );
    }
}

BoxproxyVersion.propTypes = {
    isConnected: PropTypes.bool.isRequired,
    version: PropTypes.string
};

BoxproxyVersion.defaultProps = {
    isConnected: false,
    version: undefined
};

const mapStateToProps = state => {

    return {
        isConnected: selectors.boxproxyMetaIsFetching(state),
        version: selectors.boxproxyVersion(state)
    }
};

export default connect(mapStateToProps)(BoxproxyVersion);
