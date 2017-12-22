import React, { Component } from 'react';
import Websocket from 'react-websocket';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { actions as Actions } from '../../redux/modules/boxchainModule';
import { exampleSelector } from '../../redux/selectors/exampleSelector';
import { KernelsComponent } from '../../common/components/Kernels';

import { appendDataFromWebsocket, createStateDataFromProps } from '../../utility/websocketHelper';

const config = require('../../../../config/development.json');

require('../../../style/index.css');
require('../../../style/reset.css');

const mapStateToProps = state => ({
  example: exampleSelector(state),
});

const mapDispatchToProps = {
  ...Actions,
};

@connect(mapStateToProps, mapDispatchToProps)
class KernelsView extends Component {

  static PropTypes = {
    example: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {actualData: null };
  }

  componentWillMount() {
    this.props.setUrl(config.node_url+'/store', 'Kernels');
  }

  handleWebsocketMessage(websocketData) {
    if (!this.props.example.result) return;

    var actualData = this.state.actualData;
    if (!actualData) {
        actualData = createStateDataFromProps(this.props);
    }

    appendDataFromWebsocket(actualData, websocketData);
    this.setState({ actualData: actualData });
  }

  render() {
    let actualData = this.state.actualData ? this.state.actualData : this.props;      
    return (
      <div>
        <h1 className="title">Kernels</h1>
        <KernelsComponent {...actualData} />

        <Websocket url={config.websocket_url}
            onMessage={this.handleWebsocketMessage.bind(this)}/>
      </div>
    )
  }
}

export default KernelsView;
