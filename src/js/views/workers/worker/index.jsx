import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { actions as Actions } from '../../../redux/modules/boxchainModule';
import { exampleSelector } from '../../../redux/selectors/exampleSelector';
import { Worker } from '../../../common/components/Workers/Worker';

require('../../../../style/index.css');
require('../../../../style/reset.css');

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
    this.props.setUrl('http://localhost:1111/workers', 'Worker');
  }

  render() {
    return (
      <div>
        <h1 className="title">Worker</h1>
        <Worker {...this.props} />
      </div>
    )
  }
}

export default WorkerView;
