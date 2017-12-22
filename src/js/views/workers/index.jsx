import React, { Component } from 'react';
import Websocket from 'react-websocket';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { actions as Actions } from '../../redux/modules/boxchainModule';
import { exampleSelector } from '../../redux/selectors/exampleSelector';
import { WorkersComponent } from '../../common/components/Workers/';
import { Map } from 'immutable';

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
class WorkersView extends Component {

  static PropTypes = {
    example: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {websocketData: {} };
  }

  componentWillMount() {
    this.props.setUrl(config.node_url+'/store', 'Home');
  }

  handleUpdateEvent(data)
  {
    var map = Map({
      requestRaw: JSON.parse(data)
    })

    var websocketData = {example: {result: map } };
    
    this.setState({ websocketData: websocketData });

  }
  //<Websocket url={'ws://'+config.node_url+'/workers/listener/'}

  render() {
    const workers = {...this.props, ...this.state.websocketData}
    return (
      <div>
        <h1 className="title">Workers</h1>
        <WorkersComponent {...workers} />

        <Websocket url='ws://localhost:1337/' debug={true}
            onMessage={this.handleUpdateEvent.bind(this)}/>
      </div>
    )
  }
}

export default WorkersView;
