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
    this.state = {latestData: null };
  }

  componentWillMount() {
    this.props.setUrl(config.node_url+'/store', 'Home');
    console.log("node url + " + config.node_url);
  }

  appendNewFields(json, newJson) {
    for(var key in json) {
      json[key].push(...newJson[key]);
    }
  }

  getRawRequest(container) {
    if (container && container.example && container.example.result) {
      var rawRequest = container.example.result.get("requestRaw");
      return rawRequest;
    }
    return null;
  }

  createStateFromProps() {
    var stateJson = {};
    var propsJson = this.getRawRequest(this.props).toJS();

    for(var key in propsJson) {
      stateJson[key] = propsJson[key];
    }

    var map = Map({ requestRaw: stateJson });
    return {example: {result: map } };
  }

  handleUpdateEvent(data) {
    var latestData = this.state.latestData;
    if (!latestData && this.props.example.result) {
      latestData = this.createStateFromProps();
    }

    var stateJson = this.getRawRequest(latestData);
    this.appendNewFields(stateJson, JSON.parse(data));

    this.setState({ latestData: latestData });
  }

  render() {
    let workers = this.state.latestData;
    if (!workers)
      workers = this.props;
      
    return (
      <div>
        <h1 className="title">Workers</h1>
        <WorkersComponent {...workers} />

        <Websocket url={config.websocket_url}
            onMessage={this.handleUpdateEvent.bind(this)}/>
      </div>
    )
  }
}

export default WorkersView;
