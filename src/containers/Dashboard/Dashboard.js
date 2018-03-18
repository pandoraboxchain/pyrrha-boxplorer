import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import * as selectors from '../../store/selectors';

import AddressTable from '../../components/AddressTable';
import { Grid } from 'semantic-ui-react';

class Dashboard extends PureComponent {   

    render() {

        const {
            isDatasetsFetching,
            datasets,
            datasetsErrors,
            isKernelsFetching,
            kernels,
            kernelsErrors,
            isWorkersFetching,
            workers,
            workersErrors,
            isJobsFetching,
            jobs,
            jobsErrors
        } = this.props;

        return(
            <div>
                <Grid container columns={2} stackable>
                    <Grid.Column>
                        <AddressTable 
                            header='Kernels' 
                            detailsPath='kernels' 
                            isFetching={isKernelsFetching} 
                            records={kernels}
                            errors={kernelsErrors} />
                    </Grid.Column>
                    <Grid.Column>
                        <AddressTable 
                            header='Datasets' 
                            detailsPath='datasets' 
                            isFetching={isDatasetsFetching} 
                            records={datasets}
                            errors={datasetsErrors} />
                    </Grid.Column>
                    <Grid.Column>
                        <AddressTable 
                            header='Workers' 
                            detailsPath='workers' 
                            isFetching={isWorkersFetching} 
                            records={workers}
                            errors={workersErrors} />
                    </Grid.Column>
                    <Grid.Column>
                        <AddressTable 
                            header='Jobs' 
                            detailsPath='jobs' 
                            isFetching={isJobsFetching} 
                            records={jobs}
                            errors={jobsErrors} />
                    </Grid.Column>                    
                </Grid>                
            </div>
        );
    }
};

Dashboard.propTypes = {
    isDatasetsFetching: PropTypes.bool.isRequired,
    datasets: PropTypes.array.isRequired,
    datasetsErrors: PropTypes.array.isRequired,
    isKernelsFetching: PropTypes.bool.isRequired,
    kernels: PropTypes.array.isRequired,
    kernelsErrors: PropTypes.array.isRequired,
    isWorkersFetching: PropTypes.bool.isRequired,
    workers: PropTypes.array.isRequired,
    workersErrors: PropTypes.array.isRequired,
    isJobsFetching: PropTypes.bool.isRequired,
    jobs: PropTypes.array.isRequired,
    jobsErrors: PropTypes.array.isRequired
};

Dashboard.defaultProps = {
    isDatasetsFetching: false,
    datasets: [],
    datasetsErrors: [],
    isKernelsFetching: false,
    kernels: [],
    kernelsErrors: [],
    isWorkersFetching: false,
    workers: [],
    workersErrors: [],
    isJobsFetching: false,
    jobs:[],
    jobsErrors: []
};

const mapStateToProps = (state, props) => {
        
    return {
        isDatasetsFetching: selectors.isDatasetsFetching(state),
        datasets: selectors.getDatasets(state),
        datasetsErrors: selectors.datasetsErrors(state),
        
        isKernelsFetching: selectors.isKernelsFetching(state),
        kernels: selectors.getKernels(state),
        kernelsErrors: selectors.kernelsErrors(state),

        isWorkersFetching: selectors.isWorkersFetching(state),
        workers: selectors.getWorkers(state),
        workersErrors: selectors.workersErrors(state),

        isJobsFetching: selectors.isJobsFetching(state),
        jobs: selectors.getJobs(state),
        jobsErrors: selectors.jobsErrors(state)
    }
};

export default withRouter(connect(mapStateToProps)(Dashboard));
