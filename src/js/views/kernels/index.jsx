import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { actions as Actions } from '../../redux/modules/boxchainModule';
import { exampleSelector } from '../../redux/selectors/exampleSelector';
import { KernelsComponent } from '../../common/components/Kernels';

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

  componentWillMount() {
    this.props.setUrl(config.node_url+'/store', 'Kernels');
  }

  render() {
    return (
      <div>
        <h1 className="title">Kernels</h1>
        <KernelsComponent {...this.props} />
      </div>
    )
  }
}

export default KernelsView;
