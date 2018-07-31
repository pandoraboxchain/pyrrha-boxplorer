import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Table, Button } from 'semantic-ui-react';
import { Route, Link, withRouter } from 'react-router-dom';
import ErrorsBlock from '../../components/ErrorsBlock';
import DatasetDetails from '../../containers/DatasetDetails';

import * as selectors from '../../store/selectors';
import * as actions from '../../store/actions';

import './DatasetsTable.scss';

class DatasetsTable extends Component {

    handleRefreshDatasets = (e) => {
        e.preventDefault();
        this.props.refreshDatasets();        
    };

    UNSAFE_componentWillMount = () => {
        
        if (!this.props.datasets || this.props.datasets.length === 0) {

            this.props.refreshDatasets();        
        }        
    };

    render() {
        const { isFetching, datasets, errors, match } = this.props;

        return (
            <div>
                <div>
                    <Route path={`${match.path}/:address`} component={DatasetDetails}/>                    
                </div>                
                <Table inverted celled selectable unstackable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell width={1}>Id</Table.HeaderCell>
                            <Table.HeaderCell width={4}>Address</Table.HeaderCell>
                            <Table.HeaderCell width={4}>Description</Table.HeaderCell>
                            <Table.HeaderCell width={1}>Dim</Table.HeaderCell>
                            <Table.HeaderCell width={1}>Batches</Table.HeaderCell>
                            <Table.HeaderCell width={1}>Price</Table.HeaderCell>
                        </Table.Row>                            
                    </Table.Header>
                    <Table.Body>
                        {(!datasets || datasets.length === 0) &&
                            <Table.Row>
                                <Table.Cell colSpan="6">Nothing to display</Table.Cell>
                            </Table.Row>
                        }
                        {datasets && datasets.length > 0 &&
                            datasets.map((dataset, index) => (
                                <Table.Row key={dataset.address}>
                                    <Table.Cell>{index}</Table.Cell>
                                    <Table.Cell title={dataset.address}>
                                        <Link to={{
                                            pathname: `${match.url}/${dataset.address}`,
                                            state: {
                                                prevPath: this.props.location.pathname
                                            } 
                                        }}>{dataset.address}</Link>
                                        
                                    </Table.Cell>
                                    <Table.Cell>{dataset.description}</Table.Cell>
                                    <Table.Cell>{dataset.dataDim}</Table.Cell>
                                    <Table.Cell>{dataset.batchesCount}</Table.Cell>
                                    <Table.Cell>{dataset.currentPrice}</Table.Cell>
                                </Table.Row> 
                            ))
                        }               
                    </Table.Body>
                    <Table.Footer>
                        <Table.Row>
                            <Table.Cell colSpan="6">
                                <Button 
                                    loading={isFetching}
                                    onClick={this.handleRefreshDatasets}>Refresh</Button>
                                {isFetching &&
                                    <span>Fetching of datasets...</span>
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

DatasetsTable.propTypes = {
    errors: PropTypes.array.isRequired,
    dismissError: PropTypes.func.isRequired
};

DatasetsTable.defaultProps = {
    isFetching: false,
    datasets: [],
    errors: []
};

const mapStateToProps = state => {

    return {
        isFetching: selectors.isDatasetsFetching(state),
        datasets: selectors.getDatasets(state),
        errors: selectors.datasetsErrors(state)
    }
};

const mapDispatchToProps = dispatch => {

    return {
        refreshDatasets: () => dispatch(actions.datasetsFetch()),
        dismissError: index => dispatch(actions.removeDatasetsError(index))
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DatasetsTable));
