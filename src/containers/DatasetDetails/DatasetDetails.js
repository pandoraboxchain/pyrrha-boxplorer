import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { push } from 'react-router-redux';

import * as selectors from '../../store/selectors';
import * as actions from '../../store/actions';

import { Message, Segment, Grid, Transition } from 'semantic-ui-react';
import Loading from '../../components/Loading';

import './DatasetDetails.scss';

class DatasetDetails extends PureComponent {

    state = {
        visible: false
    };

    formatMetaData(data) {
        return data ? String(data).split(',').join(', ') : '';
    }

    UNSAFE_componentWillMount() {

        if (!this.props.dataset) {

            this.props.fetchDataset(this.props.match.params.address);
        }
    }

    componentDidMount() {
        this.setState({
            visible: true
        });
    }

    handleDismissClick = e => this.props.goBackTo('/datasets');

    render() {

        const { isSingleFetching, dataset } = this.props;

        return(
            <div>
                {(!dataset || isSingleFetching) &&
                    <Loading />
                }
                {dataset &&
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
                                            <span className="label">Dataset: </span> 
                                            <a href={`https://rinkeby.etherscan.io/address/${dataset.address}`}>{dataset.address}</a>
                                        </Grid.Column>
                                        <Grid.Column className="pn-details pn-right">
                                            <span className="label">Dimension:</span> {dataset.dataDim}
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Grid.Column className="pn-details">
                                            <span className="label">Description:</span> {dataset.description}
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Grid.Column className="pn-details">
                                            <span className="label">Meta data:</span> {this.formatMetaData(dataset.metadata)}                                
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Grid.Column className="pn-details">
                                            <span className="label">Batches count:</span> {dataset.batchesCount}                                
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Grid.Column className="pn-details">
                                            <span className="label">Current price:</span> {dataset.currentPrice}
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Grid.Column className="pn-details">
                                        <span className="label">IPFS address of the dataset:</span> <a href={`https://gateway.ipfs.io/ipfs/${dataset.ipfsAddress}`}>{dataset.ipfsAddress}</a>
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

DatasetDetails.propTypes = {
    isSingleFetching: PropTypes.bool.isRequired,
    dataset: PropTypes.object
};

const mapStateToProps = (state, props) => {
    const { address } = props.match.params;
    
    return {
        isSingleFetching: selectors.isDatasetSinglesFetching(state),
        dataset: selectors.getSingleDatasetMemoized(state, address)
    }
};

const mapDispatchToProps = dispatch => {

    return {
        goBackTo: url => dispatch(push(url)),
        fetchDataset: id => dispatch(actions.fetchSingleDataset(id))
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DatasetDetails));
