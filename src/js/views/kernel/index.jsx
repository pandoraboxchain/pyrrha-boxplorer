import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { actions as Actions } from '../../redux/modules/boxchainModule';
import { exampleSelector } from '../../redux/selectors/exampleSelector';
import { OneKernelComponent } from '../../common/components/Kernel';
import { singleKernel } from '../../utility/boxchainCall'

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
class KernelView extends Component {
  static PropTypes = {
    example: PropTypes.object.isRequired,
  }

  componentDidMount() {
    this.props.setUrl(config.node_url+'/store', 'Kernel');
  }

  // componentWillUnmount() {
  //   this.props.example.result;
  // }

  render() {
    return (
      <div>
        <OneKernelComponent {...this.props} />
      </div>
    )
  }
}

export default KernelView;
