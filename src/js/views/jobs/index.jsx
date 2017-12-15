import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { actions as Actions } from '../../redux/modules/boxchainModule';
import { exampleSelector } from '../../redux/selectors/exampleSelector';
import { JobsComponent } from '../../common/components/Jobs/';

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
class JobsView extends Component {

  static PropTypes = {
    example: PropTypes.object.isRequired,
  }

  componentWillMount() {
    this.props.setUrl(config.node_url+'/store', 'Jobs');
  }

  render() {
    return (
      <div>
        <h1 className="title">Jobs</h1>
        <JobsComponent {...this.props} />
      </div>
    )
  }
}

export default JobsView;
