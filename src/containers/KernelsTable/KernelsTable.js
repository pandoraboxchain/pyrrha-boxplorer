import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Table, Button, Pagination, Input, Icon } from 'semantic-ui-react';
import { Route, Link, withRouter } from 'react-router-dom';
import ErrorsBlock from '../../components/ErrorsBlock';
import KernelDetails from '../../containers/KernelDetails';

import * as selectors from '../../store/selectors';
import * as actions from '../../store/actions';

import './KernelsTable.scss';

class KernelsTable extends Component {

    handleRefreshKernels = (e) => {
        e.preventDefault();
        this.props.refreshKernels();        
    };

    UNSAFE_componentWillMount = () => {
        
        if (!this.props.kernels || this.props.kernels.length === 0) {

            this.props.refreshKernels();        
        }        
    };

    handlePaginationChange = (e, { activePage }) => {
        e.preventDefault();
        this.props.refreshKernels(activePage); 
    }

    handleOrderBy = column => () => this.props.refreshOrderBy(column);

    handleOnChange = column => (e, { value }) => {
        e.preventDefault();
        this.props.updateKernelsFilters(column, value);
    }

    handleFilterBy = column => e => {

        if (e.charCode === 13 && this.props.filterBy[column]) {

            this.props.doKernelsSearch();
        }        
    }

    handleSearchClick = column => e => {
        this.props.resetKernelsFilter(column);
    }

    render() {
        const { isFetching, kernels, page, totalPages, orderBy, filterBy, errors, match } = this.props;

        return (
            <div>
                <div>
                    <Route path={`${match.path}/:address`} component={KernelDetails}/>                    
                </div>
                <Table inverted celled sortable selectable unstackable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell width={1} 
                                sorted={orderBy['id']} 
                                onClick={this.handleOrderBy('id')}
                                >Id</Table.HeaderCell>
                            <Table.HeaderCell width={4}>
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
                                sorted={orderBy['complexity']} 
                                onClick={this.handleOrderBy('complexity')}
                                >Compl</Table.HeaderCell>
                            <Table.HeaderCell width={1} 
                                sorted={orderBy['currentPrice']} 
                                onClick={this.handleOrderBy('currentPrice')}
                                >Price</Table.HeaderCell>
                        </Table.Row>                            
                    </Table.Header>
                    <Table.Body>
                        {(!kernels || kernels.length === 0) &&
                            <Table.Row>
                                <Table.Cell colSpan="6">Nothing to display</Table.Cell>
                            </Table.Row>
                        }
                        {kernels && kernels.length > 0 &&
                            kernels.map((kernel) => (
                                <Table.Row key={kernel.address}>
                                    <Table.Cell>{kernel.id}</Table.Cell>
                                    <Table.Cell title={kernel.address}>
                                        <Link to={{
                                            pathname: `${match.url}/${kernel.address}`,
                                            state: {
                                                prevPath: this.props.location.pathname
                                            } 
                                        }}>{kernel.address}</Link>
                                        
                                    </Table.Cell>
                                    <Table.Cell>{kernel.description}</Table.Cell>
                                    <Table.Cell>{kernel.dataDim}</Table.Cell>
                                    <Table.Cell>{kernel.complexity}</Table.Cell>
                                    <Table.Cell>{kernel.currentPrice}</Table.Cell>
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
                                    onClick={this.handleRefreshKernels}>Refresh</Button>
                                {isFetching &&
                                    <span>Fetching of kernels...</span>
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

KernelsTable.propTypes = {
    errors: PropTypes.array.isRequired,
    dismissError: PropTypes.func.isRequired
};

KernelsTable.defaultProps = {
    isFetching: false,
    kernels: [],
    page: 1,
    totalPages: 0,
    orderBy: {},
    filterBy: {},
    errors: []
};

const mapStateToProps = state => {

    return {
        isFetching: selectors.isKernelsFetching(state),
        kernels: selectors.getKernels(state),
        page: selectors.getKernelsPage(state),
        totalPages: selectors.getKernelsTotalPages(state),
        orderBy: selectors.getKernelsOrderBy(state),
        filterBy: selectors.getKernelsFilterBy(state),
        errors: selectors.kernelsErrors(state)
    }
};

const mapDispatchToProps = dispatch => {

    return {
        refreshKernels: activePage => dispatch(actions.kernelsFetch(activePage)),
        refreshOrderBy: column => dispatch(actions.kernelsOrderByToggle(column)),
        updateKernelsFilters: (column, value) => dispatch(actions.kernelUpdateFilter(column, value)),
        doKernelsSearch: () => dispatch(actions.doKernelsSearch()),
        resetKernelsFilter: column => dispatch(actions.resetKernelsFilter(column)),
        dismissError: index => dispatch(actions.removeKernelsError(index))
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(KernelsTable));
