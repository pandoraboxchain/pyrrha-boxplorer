import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Table, Button, Pagination, Input, Icon } from 'semantic-ui-react';
import { Route, Link, withRouter } from 'react-router-dom';
import ErrorsBlock from '../../components/ErrorsBlock';
import WorkerDetails from '../../containers/WorkerDetails';

import * as selectors from '../../store/selectors';
import * as actions from '../../store/actions';
import { convertWorkerStatusCode, convertJobStatusCode } from '../../utils';

import './WorkersTable.scss';

class WorkersTable extends Component {

    handleRefreshWorkers = (e) => {
        e.preventDefault();
        this.props.refresh(this.props.page);        
    };

    UNSAFE_componentWillMount = () => {
        
        if (!this.props.workers || this.props.workers.length === 0) {

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
        const { isFetching, workers, page, totalPages, orderBy, filterBy, errors, match } = this.props;

        return (
            <div>
                <div>
                    <Route path={`${match.path}/:address`} component={WorkerDetails}/>                    
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
                            <Table.HeaderCell width={1} 
                                sorted={orderBy['currentState']} 
                                onClick={this.handleOrderBy('currentState')}
                                >Status</Table.HeaderCell>
                            <Table.HeaderCell width={1} 
                                sorted={orderBy['currentJobStatus']} 
                                onClick={this.handleOrderBy('currentJobStatus')}
                                >Job status</Table.HeaderCell>
                        </Table.Row>                            
                    </Table.Header>
                    <Table.Body>
                        {(!workers || workers.length === 0) &&
                            <Table.Row>
                                <Table.Cell colSpan="4">Nothing to display</Table.Cell>
                            </Table.Row>
                        }
                        {workers && workers.length > 0 &&
                            workers.map(worker => (
                                <Table.Row key={worker.address}>
                                    <Table.Cell>{worker.id}</Table.Cell>
                                    <Table.Cell title={worker.address}>
                                        <Link to={{
                                            pathname: `${match.url}/${worker.address}`,
                                            state: {
                                                prevPath: this.props.location.pathname
                                            } 
                                        }}>{worker.address}</Link>
                                        
                                    </Table.Cell>
                                    <Table.Cell>{convertWorkerStatusCode(worker.currentState)}</Table.Cell>
                                    <Table.Cell>{convertJobStatusCode(worker.currentJobStatus)}</Table.Cell>
                                </Table.Row> 
                            ))
                        }               
                    </Table.Body>
                    <Table.Footer>
                        <Table.Row>
                            <Table.Cell colSpan="4">
                                <Pagination 
                                    inverted 
                                    activePage={page}
                                    onPageChange={this.handlePaginationChange}
                                    totalPages={totalPages} />
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell colSpan="4">
                                <Button 
                                    loading={isFetching}
                                    onClick={this.handleRefreshWorkers}>Refresh</Button>
                                {isFetching &&
                                    <span>Fetching of workers...</span>
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

WorkersTable.propTypes = {
    errors: PropTypes.array.isRequired,
    dismissError: PropTypes.func.isRequired
};

WorkersTable.defaultProps = {
    isFetching: false,
    workers: [],
    page: 1,
    totalPages: 0,
    orderBy: {},
    filterBy: {},
    errors: []
};

const mapStateToProps = state => {

    return {
        isFetching: selectors.isWorkersFetching(state),
        workers: selectors.getWorkers(state),
        page: selectors.getWorkersPage(state),
        totalPages: selectors.getWorkersTotalPages(state),
        orderBy: selectors.getWorkersOrderBy(state),
        filterBy: selectors.getWorkersFilterBy(state),
        errors: selectors.workersErrors(state)
    }
};

const mapDispatchToProps = dispatch => {

    return {
        refresh: activePage => dispatch(actions.workersFetch(activePage)),
        refreshOrderBy: column => dispatch(actions.workersOrderByToggle(column)),
        updateFilters: (column, value) => dispatch(actions.workerUpdateFilter(column, value)),
        doSearch: () => dispatch(actions.doWorkersSearch()),
        resetFilter: column => dispatch(actions.resetWorkersFilter(column)),
        dismissError: index => dispatch(actions.removeWorkersError(index))
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WorkersTable));
