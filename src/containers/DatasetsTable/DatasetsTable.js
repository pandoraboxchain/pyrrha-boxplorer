import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Table, Button, Pagination, Input, Icon } from 'semantic-ui-react';
import { Route, Link, withRouter } from 'react-router-dom';
import ErrorsBlock from '../../components/ErrorsBlock';
import DatasetDetails from '../../containers/DatasetDetails';

import * as selectors from '../../store/selectors';
import * as actions from '../../store/actions';

import './DatasetsTable.scss';

class DatasetsTable extends Component {

    handleRefreshDatasets = (e) => {
        e.preventDefault();
        this.props.refresh();        
    };

    UNSAFE_componentWillMount = () => {
        
        if (!this.props.datasets || this.props.datasets.length === 0) {

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
        const { isFetching, datasets, page, totalPages, orderBy, filterBy, errors, match } = this.props;

        return (
            <div>
                <div>
                    <Route path={`${match.path}/:address`} component={DatasetDetails}/>                    
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
                                sorted={orderBy['dataDim']} 
                                onClick={this.handleOrderBy('dataDim')}
                                >Dim</Table.HeaderCell>
                            <Table.HeaderCell width={1} 
                                sorted={orderBy['batchesCount']} 
                                onClick={this.handleOrderBy('batchesCount')}
                            >Batches</Table.HeaderCell>
                            <Table.HeaderCell width={1} 
                                sorted={orderBy['currentPrice']} 
                                onClick={this.handleOrderBy('currentPrice')}
                            >Price</Table.HeaderCell>
                        </Table.Row>                            
                    </Table.Header>
                    <Table.Body>
                        {(!datasets || datasets.length === 0) &&
                            <Table.Row>
                                <Table.Cell colSpan="6">Nothing to display</Table.Cell>
                            </Table.Row>
                        }
                        {datasets && datasets.length > 0 &&
                            datasets.map(dataset => (
                                <Table.Row key={dataset.address}>
                                    <Table.Cell>{dataset.id}</Table.Cell>
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
                                <Pagination 
                                    inverted 
                                    activePage={page}
                                    onPageChange={this.handlePaginationChange}
                                    totalPages={totalPages} />
                            </Table.Cell>
                        </Table.Row>
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
    page: 1,
    totalPages: 0,
    orderBy: {},
    filterBy: {},
    errors: []
};

const mapStateToProps = state => {

    return {
        isFetching: selectors.isDatasetsFetching(state),
        datasets: selectors.getDatasets(state),
        page: selectors.getDatasetsPage(state),
        totalPages: selectors.getDatasetsTotalPages(state),
        orderBy: selectors.getDatasetsOrderBy(state),
        filterBy: selectors.getDatasetsFilterBy(state),
        errors: selectors.datasetsErrors(state)
    }
};

const mapDispatchToProps = dispatch => {

    return {
        refresh: activePage => dispatch(actions.datasetsFetch(activePage)),
        refreshOrderBy: column => dispatch(actions.datasetsOrderByToggle(column)),
        updateFilters: (column, value) => dispatch(actions.datasetUpdateFilter(column, value)),
        doSearch: () => dispatch(actions.doDatasetsSearch()),
        resetFilter: column => dispatch(actions.resetDatasetsFilter(column)),
        dismissError: index => dispatch(actions.removeDatasetsError(index))
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DatasetsTable));
