import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { push } from 'react-router-redux';

import * as selectors from '../../store/selectors';
import * as actions from '../../store/actions';
import { convertJobStatusCode } from '../../utils';

import { Message, Segment, Grid, Transition } from 'semantic-ui-react';
import Loading from '../../components/Loading';

import './JobDetails.scss';

class JobDetails extends PureComponent {

    state = {
        visible: false
    };

    UNSAFE_componentWillMount() {

        if (!this.props.job) {

            this.props.fetchJob(this.props.match.params.address);
        }
    }

    componentDidMount() {
        this.setState({
            visible: true
        });
    }

    handleDismissClick = e => this.props.goBackTo('/jobs');

    render() {

        const { isSingleFetching, job } = this.props;

        return(
            <div>
                {(!job || isSingleFetching) &&
                    <Loading />
                }
                {job &&
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
                                        <Grid.Column width={12} className="pn-details top">
                                            <span className="label">Job: </span>
                                            <a href={`https://rinkeby.etherscan.io/address/${job.address}`}>{job.address}</a>
                                        </Grid.Column>
                                        <Grid.Column width={4} className="pn-details pn-right">
                                            <nobr><span className="label">Status:</span> {convertJobStatusCode(job.jobStatus)}</nobr>
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Grid.Column className="pn-details">
                                            <span className="label">Kernel: </span> 
                                            <a href={`https://rinkeby.etherscan.io/address/${job.kernel}`}>{job.kernel}</a>
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Grid.Column className="pn-details">
                                            <span className="label">Dataset: </span> 
                                            <a href={`https://rinkeby.etherscan.io/address/${job.dataset}`}>{job.dataset}</a>      
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Grid.Column className="pn-details">
                                            <span className="label">Batches count: </span> {job.batches}                                
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Grid.Column className="pn-details">
                                            <span className="label">Progress: </span> {job.progress}                                
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Grid.Column className="pn-details">
                                            <span className="label">Active workers count: </span> {job.activeWorkersCount}
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Grid.Column className="pn-details">
                                            <span className="label">IPFS results: </span> 
                                            <ul>
                                            {job.ipfsResults && Array.isArray(job.ipfsResults) &&
                                                (job.ipfsResults.map((result, index) => (
                                                    <li key={index}><a href={`https://gateway.ipfs.io/ipfs/${result}`}>{result}</a></li>
                                                )))
                                            }
                                            </ul>
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

JobDetails.propTypes = {
    isSingleFetching: PropTypes.bool.isRequired,
    job: PropTypes.object
};

const mapStateToProps = (state, props) => {
    const { address } = props.match.params;
    
    return {
        isSingleFetching: selectors.isJobSinglesFetching(state),
        job: selectors.getSingleJobMemoized(state, address)
    }
};

const mapDispatchToProps = dispatch => {

    return {
        goBackTo: url => dispatch(push(url)),
        fetchJob: id => dispatch(actions.fetchSingleJob(id))
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(JobDetails));
