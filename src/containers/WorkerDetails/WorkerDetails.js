import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { push } from 'react-router-redux';

import * as selectors from '../../store/selectors';
import * as actions from '../../store/actions';
import { convertWorkerStatusCode, convertJobStatusCode } from '../../utils';

import { Message, Segment, Grid, Transition } from 'semantic-ui-react';
import Loading from '../../components/Loading';

import './WorkerDetails.scss';

class WorkerDetails extends PureComponent {

    state = {
        visible: false
    };

    UNSAFE_componentWillMount() {

        if (!this.props.worker) {

            this.props.fetchWorker(this.props.match.params.address);
        }
    }

    componentDidMount() {
        this.setState({
            visible: true
        });
    }

    handleDismissClick = e => this.props.goBackTo('/workers');

    render() {

        const { isSingleFetching, worker } = this.props;

        return(
            <div>
                {(!worker || isSingleFetching) &&
                    <Loading />
                }
                {worker &&
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
                                            <span className="label">Worker: </span> 
                                            <a href={`https://rinkeby.etherscan.io/address/${worker.address}`}>{worker.address}</a>
                                        </Grid.Column>
                                        <Grid.Column className="pn-details pn-right">
                                            <span className="label">Status:</span> {convertWorkerStatusCode(worker.currentState)}
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Grid.Column className="pn-details">
                                            <span className="label">Current job: </span> 
                                            {worker.currentJob &&
                                                <a href={`https://rinkeby.etherscan.io/address/${worker.currentJob}`}>{worker.currentJob}</a>
                                            }
                                            {!worker.currentJob && 
                                                <span>no</span>
                                            }
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Grid.Column className="pn-details">
                                            <span className="label">Job Status:</span> {convertJobStatusCode(worker.currentJobStatus)}
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

WorkerDetails.propTypes = {
    isSingleFetching: PropTypes.bool.isRequired,
    worker: PropTypes.object
};

const mapStateToProps = (state, props) => {
    const { address } = props.match.params;
    
    return {
        isSingleFetching: selectors.isWorkerSinglesFetching(state),
        worker: selectors.getSingleWorkerMemoized(state, address)
    }
};

const mapDispatchToProps = dispatch => {

    return {
        goBackTo: url => dispatch(push(url)),
        fetchWorker: id => dispatch(actions.fetchSingleWorker(id))
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WorkerDetails));
