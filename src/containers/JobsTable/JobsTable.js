import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Table, Button } from 'semantic-ui-react';
import { Route, Link, withRouter } from 'react-router-dom';
import ErrorsBlock from '../../components/ErrorsBlock';
import JobDetails from '../../containers/JobDetails';

import * as selectors from '../../store/selectors';
import * as actions from '../../store/actions';

import './JobsTable.scss';

class JobsTable extends Component {

    handleRefreshJobs = (e) => {
        e.preventDefault();
        this.props.refreshJobs();        
    };

    componentWillMount = () => {
        
        if (!this.props.jobs || this.props.jobs.length === 0) {

            this.props.refreshJobs();        
        }        
    };

    render() {
        const { isFetching, jobs, errors, match } = this.props;

        return (
            <div>
                <div>
                    <Route path={`${match.path}/:address`} component={JobDetails}/>                    
                </div>                
                <Table inverted celled selectable unstackable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell width={1}>Id</Table.HeaderCell>
                            <Table.HeaderCell>Address</Table.HeaderCell>
                            <Table.HeaderCell width={2}>Status</Table.HeaderCell>
                            <Table.HeaderCell width={2}>Baches</Table.HeaderCell>
                            <Table.HeaderCell width={2}>Progress</Table.HeaderCell>
                        </Table.Row>                            
                    </Table.Header>
                    <Table.Body>
                        {(!jobs || jobs.length === 0) &&
                            <Table.Row>
                                <Table.Cell colSpan="5">Nothing to display</Table.Cell>
                            </Table.Row>
                        }
                        {jobs && jobs.length > 0 &&
                            jobs.map(job => (
                                <Table.Row key={job.address}>
                                    <Table.Cell>{job.id}</Table.Cell>
                                    <Table.Cell title={job.address}>
                                        <Link to={{
                                            pathname: `${match.url}/${job.address}`,
                                            state: {
                                                prevPath: this.props.location.pathname
                                            } 
                                        }}>{job.address}</Link>
                                        
                                    </Table.Cell>
                                    <Table.Cell>{job.currentState}</Table.Cell>
                                    <Table.Cell>{job.batches}</Table.Cell>
                                    <Table.Cell>{job.progress}</Table.Cell>
                                </Table.Row> 
                            ))
                        }               
                    </Table.Body>
                    <Table.Footer>
                        <Table.Row>
                            <Table.Cell colSpan="5">
                                <Button 
                                    loading={isFetching}
                                    onClick={this.handleRefreshJobs}>Refresh</Button>
                                {isFetching &&
                                    <span>Fetching of jobs...</span>
                                }
                            </Table.Cell>
                        </Table.Row>
                    </Table.Footer>
                </Table>
                <ErrorsBlock errors={errors} dismissError={this.props.dismissError} />
            </div>
        );
    }
}

JobsTable.propTypes = {
    errors: PropTypes.array.isRequired,
    dismissError: PropTypes.func.isRequired
};

JobsTable.defaultProps = {
    isFetching: false,
    jobs: [],
    errors: []
};

const mapStateToProps = state => {

    console.log(state)

    return {
        isFetching: selectors.isJobsFetching(state),
        jobs: selectors.getJobs(state),
        errors: selectors.jobsErrors(state)
    }
};

const mapDispatchToProps = dispatch => {

    return {
        refreshJobs: () => dispatch(actions.jobsFetch()),
        dismissError: index => dispatch(actions.removeJobsError(index))
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(JobsTable));
