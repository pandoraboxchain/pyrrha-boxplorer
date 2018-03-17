import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Table, Button } from 'semantic-ui-react';
import { Route, Link, withRouter } from 'react-router-dom';
import ErrorsBlock from '../../components/ErrorsBlock';
import KernelDetails from '../../containers/KernelDetails/KernelDetails';

import * as selectors from '../../store/selectors';
import * as actions from '../../store/actions';

import './KernelsTable.scss';

class KernelsTable extends Component {

    handleRefreshKernels = (e) => {
        e.preventDefault();
        this.props.refreshKernels();        
    };

    componentWillMount = () => {
        
        if (!this.props.kernels || this.props.kernels.length === 0) {

            this.props.refreshKernels();        
        }        
    };

    render() {
        const { isFetching, kernels, errors, match } = this.props;

        return (
            <div>
                <div>
                    <Route path={`${match.path}/:address`} component={KernelDetails}/>                    
                </div>                
                <Table celled selectable unstackable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell width={1}>Id</Table.HeaderCell>
                            <Table.HeaderCell>Address</Table.HeaderCell>
                            <Table.HeaderCell width={2}>Dim</Table.HeaderCell>
                            <Table.HeaderCell width={2}>Compl</Table.HeaderCell>
                            <Table.HeaderCell width={2}>Price</Table.HeaderCell>
                        </Table.Row>                            
                    </Table.Header>
                    <Table.Body>
                        {kernels && kernels.length > 0 &&
                            kernels.map(kernel => (
                                <Table.Row key={kernel.id}>
                                    <Table.Cell>{kernel.id}</Table.Cell>
                                    <Table.Cell title={kernel.address}>
                                        <Link to={{
                                            pathname: `${match.url}/${kernel.address}`,
                                            state: {
                                                prevPath: this.props.location.pathname
                                            } 
                                        }}>{kernel.address}</Link>
                                        
                                    </Table.Cell>
                                    <Table.Cell>{kernel.dataDim}</Table.Cell>
                                    <Table.Cell>{kernel.complexity}</Table.Cell>
                                    <Table.Cell>{kernel.currentPrice}</Table.Cell>
                                </Table.Row> 
                            ))
                        }               
                    </Table.Body>
                    <Table.Footer>
                        <Table.Row>
                            <Table.Cell colSpan="5">
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

const mapStateToProps = state => {

    return {
        isFetching: selectors.isKernelsFetching(state),
        kernels: selectors.getKernels(state),
        errors: selectors.kernelsErrors(state)
    }
};

const mapDispatchToProps = dispatch => {

    return {
        refreshKernels: () => dispatch(actions.kernelsFetch()),
        dismissError: index => dispatch(actions.removeKernelsError(index))
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(KernelsTable));
