import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { actions as Actions } from '../../redux/modules/boxchainModule';
import { exampleSelector } from '../../redux/selectors/exampleSelector';
import { OneWorkerComponent } from '../../common/components/Worker';
import { singleWorker } from '../../utility/boxchainCall'

require('../../../style/index.css');
require('../../../style/reset.css');

const mapStateToProps = state => ({
  example: exampleSelector(state),
});

const mapDispatchToProps = {
  ...Actions,
};

@connect(mapStateToProps, mapDispatchToProps)
class WorkerView extends Component {
  static PropTypes = {
    example: PropTypes.object.isRequired,
  }

  componentDidMount() {
    this.props.setUrl(`http://localhost:1111/workers`, 'Worker');
  }

  // componentWillUnmount() {
  //   this.props.example.result;
  // }

  render() {
    return (
      <div>
        <OneWorkerComponent {...this.props} />
      </div>
    )
  }
}

export default WorkerView;
