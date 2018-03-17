import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { push } from 'react-router-redux';

import * as selectors from '../../store/selectors';
import * as actions from '../../store/actions';

import { Message, Segment, Grid, Transition } from 'semantic-ui-react';

import './KernelDetails.scss';

class KernelDetails extends PureComponent {

    state = {
        visible: false
    };

    componentDidMount() {
        this.setState({
            visible: true
        });
    }

    handleBackClick = e => {
        e.preventDefault();
        this.props.gotToKernels();
    };

    render() {

        const { isFetching, kernel } = this.props;

        return(
            <div>
                <Transition visible={this.state.visible} animation='slide up' duration={300}>
                    <Message 
                        onDismiss={this.handleBackClick}>
                        <Segment>
                            <Grid columns='equal'>
                                <Grid.Row>
                                    <Grid.Column width={13} className="pn-details top">
                                        <span className="label">Kernel</span>: {kernel.address}
                                    </Grid.Column>
                                    <Grid.Column className="pn-details">
                                        <span className="label">Dimension:</span> {kernel.dataDim}
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Column className="pn-details">
                                        <span className="label">Complexity:</span> {kernel.complexity}                                
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Column className="pn-details">
                                        <span className="label">Current price:</span> {kernel.currentPrice}
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Column className="pn-details">
                                        <span className="label">IPFS address of the model:</span> {kernel.ipfsAddress}
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Segment>
                    </Message>
                </Transition>
            </div>
        );
    }
};

const mapStateToProps = (state, props) => {
    const { address } = props.match.params;
    
    return {
        isFetching: selectors.isKernelsFetching(state),
        kernel: selectors.getSingleKernelMemoized(state, address)
    }
};

const mapDispatchToProps = dispatch => {

    return {
        gotToKernels: () => dispatch(push('/kernels')),
        fetchKernel: (id) => dispatch(actions.fetchSingleKernel(id))
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(KernelDetails));
