import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Label } from 'semantic-ui-react';

import * as selectors from '../../store/selectors';
import * as actions from '../../store/actions';

class SocketStatus extends PureComponent {

    render() {
        const { isConnected } = this.props;

        return (
            <div>
                {isConnected &&
                    <Label color='teal'>OnLine</Label>    
                }
                {!isConnected &&
                    <Label onClick={this.props.websocketInit} color='red'>OffLine</Label>
                }
            </div>
        );
    }
}

SocketStatus.propTypes = {
    isConnected: PropTypes.bool.isRequired
};

SocketStatus.defaultProps = {
    isConnected: false
};

const mapStateToProps = state => {

    return {
        isConnected: selectors.isWebsocketConnected(state)
    }
};

const mapDispatchToProps = dispatch => {

    return {
        websocketInit: () => dispatch(actions.websocketInit())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SocketStatus);
