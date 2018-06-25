import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Table, Button } from 'semantic-ui-react';
import { Route, Link, withRouter } from 'react-router-dom';
import ErrorsBlock from '../../components/ErrorsBlock';
import WorkerDetails from '../../containers/WorkerDetails';

import * as selectors from '../../store/selectors';
import * as actions from '../../store/actions';
import { convertWorkerStatusCode, convertJobStatusCode } from '../../utils';

import './WorkersTable.scss';

class WorkersTable extends Component {

    convertWorkerStatusCode(code) {

        switch (Number(code)) {
            case 1: return 'Offline';
            case 2: return 'Idle';
            case 3: return 'Assigned';
            case 4: return 'Ready for data validation';
            case 5: return 'Validating data';
            case 6: return 'Ready for computing';
            case 7: return 'Computing';
            case 8: return 'Insufficient stake';
            case 9: return 'Under penalty';
            default: return 'Unknown';
        }
    }

    handleRefreshWorkers = (e) => {
        e.preventDefault();
        this.props.refreshWorkers();        
    };

    UNSAFE_componentWillMount = () => {
        
        if (!this.props.workers || this.props.workers.length === 0) {

            this.props.refreshWorkers();        
        }        
    };

    render() {
        const { isFetching, workers, errors, match } = this.props;

        return (
            <div>
                <div>
                    <Route path={`${match.path}/:address`} component={WorkerDetails}/>                    
                </div>                
                <Table inverted celled selectable unstackable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Address</Table.HeaderCell>
                            <Table.HeaderCell width={1}>Status</Table.HeaderCell>
                            <Table.HeaderCell width={1}>Job status</Table.HeaderCell>
                        </Table.Row>                            
                    </Table.Header>
                    <Table.Body>
                        {(!workers || workers.length === 0) &&
                            <Table.Row>
                                <Table.Cell colSpan="5">Nothing to display</Table.Cell>
                            </Table.Row>
                        }
                        {workers && workers.length > 0 &&
                            workers.map(worker => (
                                <Table.Row key={worker.address}>
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
                            <Table.Cell colSpan="5">
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
    errors: []
};

const mapStateToProps = state => {

    return {
        isFetching: selectors.isWorkersFetching(state),
        workers: selectors.getWorkers(state),
        errors: selectors.workersErrors(state)
    }
};

const mapDispatchToProps = dispatch => {

    return {
        refreshWorkers: () => dispatch(actions.workersFetch()),
        dismissError: index => dispatch(actions.removeWorkersError(index))
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WorkersTable));
