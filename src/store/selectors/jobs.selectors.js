import { createSelector } from 'reselect';

export const isJobsFetching = state => !!state.jobs.isFetching;
export const isJobSinglesFetching = state => !!state.jobs.isSingleFetching;
export const jobsErrors = state => state.jobs.errorMessages;
export const getJobs = state => state.jobs.jobs;
export const getSingleJob = (state, id) => state.jobs.jobs.find(job => job.address === id);
export const getSingleJobMemoized = createSelector(
    getSingleJob,
    job => job
);
