import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { actions as Actions } from '../../redux/modules/boxchainModule';
import { exampleSelector } from '../../redux/selectors/exampleSelector';
import { Workers } from '../../common/components/Workers';
import { ErrorBoundary } from '../../common/components/Utilities';

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

  componentDidMount() {
    this.props.setUrl('http://localhost:1111/workers', 'Workers');
  }

  render() {
    return (
      <div>
        <h1 className="title">Workers</h1>
        <Workers {...this.props} />
      </div>
    )
  }
}

export default WorkersView;
