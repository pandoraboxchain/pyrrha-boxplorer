import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Table, Button, Pagination, Input, Icon } from 'semantic-ui-react';
import { Route, Link, withRouter } from 'react-router-dom';
import ErrorsBlock from '../../components/ErrorsBlock';
import JobDetails from '../../containers/JobDetails';

import * as selectors from '../../store/selectors';
import * as actions from '../../store/actions';
import { convertJobStatusCode } from '../../utils';

import './JobsTable.scss';

class JobsTable extends Component {

    handleRefreshJobs = (e) => {
        e.preventDefault();
        this.props.refresh();        
    };

    UNSAFE_componentWillMount = () => {
        
        if (!this.props.jobs || this.props.jobs.length === 0) {

            this.props.refresh();       
        }        
    };

    handlePaginationChange = (e, { activePage }) => {
        e.preventDefault();
        this.props.refresh(activePage); 
    }

    handleOrderBy = column => () => this.props.refreshOrderBy(column);

    handleOnChange = column => (e, { value }) => {
        e.preventDefault();
        this.props.updateFilters(column, value);
    }

    handleFilterBy = column => e => {

        if (e.charCode === 13 && this.props.filterBy[column]) {

            this.props.doSearch();
        }        
    }

    handleSearchClick = column => e => {
        this.props.resetFilter(column);
    }

    render() {
        const { isFetching, jobs, page, totalPages, orderBy, filterBy, errors, match } = this.props;

        return (
            <div>
                <div>
                    <Route path={`${match.path}/:address`} component={JobDetails}/>                    
                </div>                
                <Table inverted celled sortable selectable unstackable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell width={1} 
                                sorted={orderBy['id']} 
                                onClick={this.handleOrderBy('id')}
                                >Id</Table.HeaderCell>
                            <Table.HeaderCell width={4} >
                                <Input className="fiter-by" fluid transparent placeholder='Address' 
                                    value={filterBy['address'] || ''}
                                    onChange={this.handleOnChange('address')} 
                                    onKeyPress={this.handleFilterBy('address')}>
                                    <input />
                                    <Icon inverted 
                                        name={filterBy['address'] ? 'remove' : 'search'} 
                                        onClick={this.handleSearchClick('address')} />
                                </Input> 
                            </Table.HeaderCell>
                            <Table.HeaderCell width={4}>
                                <Input className="fiter-by" fluid transparent placeholder='Description' 
                                    value={filterBy['description'] || ''}
                                    onChange={this.handleOnChange('description')} 
                                    onKeyPress={this.handleFilterBy('description')}>
                                    <input />
                                    <Icon inverted 
                                        name={filterBy['description'] ? 'remove' : 'search'} 
                                        onClick={this.handleSearchClick('description')} />
                                </Input>
                            </Table.HeaderCell>
                            <Table.HeaderCell width={1} 
                                sorted={orderBy['state']} 
                                onClick={this.handleOrderBy('state')}
                                >Status</Table.HeaderCell>
                            <Table.HeaderCell width={1} 
                                sorted={orderBy['progress']} 
                                onClick={this.handleOrderBy('progress')}
                                >Progress</Table.HeaderCell>
                        </Table.Row>                            
                    </Table.Header>
                    <Table.Body>
                        {(!jobs || jobs.length === 0) &&
                            <Table.Row>
                                <Table.Cell colSpan="5">Nothing to display</Table.Cell>
                            </Table.Row>
                        }
                        {jobs && jobs.length > 0 &&
                            jobs.map((job, index) => (
                                <Table.Row key={job.address}>
                                    <Table.Cell>{index}</Table.Cell>
                                    <Table.Cell title={job.address}>
                                        <Link to={{
                                            pathname: `${match.url}/${job.address}`,
                                            state: {
                                                prevPath: this.props.location.pathname
                                            } 
                                        }}>{job.address}</Link>
                                        
                                    </Table.Cell>
                                    <Table.Cell>{job.description}</Table.Cell>
                                    <Table.Cell>{convertJobStatusCode(job.state)}</Table.Cell>
                                    <Table.Cell>{job.progress}</Table.Cell>
                                </Table.Row> 
                            ))
                        }               
                    </Table.Body>
                    <Table.Footer>
                        <Table.Row>
                            <Table.Cell colSpan="5">
                                <Pagination 
                                    inverted 
                                    activePage={page}
                                    onPageChange={this.handlePaginationChange}
                                    totalPages={totalPages} />
                            </Table.Cell>
                        </Table.Row>
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
    page: 1,
    totalPages: 0,
    orderBy: {},
    filterBy: {},
    errors: []
};

const mapStateToProps = state => {

    return {
        isFetching: selectors.isJobsFetching(state),
        jobs: selectors.getJobs(state),
        page: selectors.getJobsPage(state),
        totalPages: selectors.getJobsTotalPages(state),
        orderBy: selectors.getJobsOrderBy(state),
        filterBy: selectors.getJobsFilterBy(state),
        errors: selectors.jobsErrors(state)
    }
};

const mapDispatchToProps = dispatch => {

    return {
        refresh: activePage => dispatch(actions.jobsFetch(activePage)),
        refreshOrderBy: column => dispatch(actions.jobsOrderByToggle(column)),
        updateFilters: (column, value) => dispatch(actions.jobUpdateFilter(column, value)),
        doSearch: () => dispatch(actions.doJobsSearch()),
        resetFilter: column => dispatch(actions.resetJobsFilter(column)),
        dismissError: index => dispatch(actions.removeJobsError(index))
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(JobsTable));
