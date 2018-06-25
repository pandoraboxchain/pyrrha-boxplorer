import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { push } from 'react-router-redux';

import * as selectors from '../../store/selectors';
import * as actions from '../../store/actions';

import { Message, Segment, Grid, Transition } from 'semantic-ui-react';
import Loading from '../../components/Loading';

import './KernelDetails.scss';

class KernelDetails extends PureComponent {

    state = {
        visible: false
    };

    formatMetaData(data) {
        return data ? String(data).split(',').join(', ') : '';
    }

    UNSAFE_componentWillMount() {

        if (!this.props.kernel) {

            this.props.fetchKernel(this.props.match.params.address);
        }
    }

    componentDidMount() {
        this.setState({
            visible: true
        });
    }

    handleDismissClick = e => this.props.goBackTo('/kernels');

    render() {

        const { isSingleFetching, kernel } = this.props;

        return(
            <div>
                {(!kernel || isSingleFetching) &&
                    <Loading />
                }
                {kernel &&
                    <Transition 
                        visible={this.state.visible} 
                        animation='swing up' 
                        duration={150}>
                        <Message
                            color="black" 
                            onDismiss={this.handleDismissClick}>
                            <Segment inverted>
                                <Grid columns='equal'>
                                    <Grid.Row>
                                        <Grid.Column width={13} className="pn-details top">
                                            <span className="label">Kernel: </span> 
                                            <a href={`https://rinkeby.etherscan.io/address/${kernel.address}`}>{kernel.address}</a>
                                        </Grid.Column>
                                        <Grid.Column className="pn-details pn-right">
                                            <span className="label">Dimension:</span> {kernel.dataDim}
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Grid.Column className="pn-details">
                                            <span className="label">Description:</span> {kernel.description}                                
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Grid.Column className="pn-details">
                                            <span className="label">Meta data:</span> {this.formatMetaData(kernel.metadata)}                                
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
                                            <span className="label">IPFS address of the model:</span> <a href={`https://gateway.ipfs.io/ipfs/${kernel.ipfsAddress}`}>{kernel.ipfsAddress}</a>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </Segment>
                        </Message>
                    </Transition>
                }
            </div>
        );
    }
};

KernelDetails.propTypes = {
    isSingleFetching: PropTypes.bool.isRequired,
    kernel: PropTypes.object
};

const mapStateToProps = (state, props) => {
    const { address } = props.match.params;
    
    return {
        isSingleFetching: selectors.isKernelSinglesFetching(state),
        kernel: selectors.getSingleKernelMemoized(state, address)
    }
};

const mapDispatchToProps = dispatch => {

    return {
        goBackTo: url => dispatch(push(url)),
        fetchKernel: id => dispatch(actions.fetchSingleKernel(id))
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(KernelDetails));
