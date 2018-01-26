import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { actions as Actions } from '../../redux/modules/boxchainModule';
import { exampleSelector } from '../../redux/selectors/exampleSelector';
import { HomeComponent } from '../../common/components/Home/';

import config from '../../../../config/development.json';

require('../../../style/index.css');
require('../../../style/reset.css');

const mapStateToProps = state => ({
  example: exampleSelector(state),
});

const mapDispatchToProps = {
  ...Actions,
};

@connect(mapStateToProps, mapDispatchToProps)
class HomeView extends Component {

  static PropTypes = {
    example: PropTypes.object.isRequired,
  }

  componentWillMount() {
    this.props.setUrl(config.node_url+'/store', 'Home');
  }

  render() {
    return (
      <div>
        <HomeComponent {...this.props} />
      </div>
    )
  }
}

export default HomeView;
