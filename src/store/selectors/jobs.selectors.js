import { createSelector } from 'reselect';
import config from '../../config';

export const isJobsFetching = state => !!state.jobs.isFetching;
export const isJobSinglesFetching = state => !!state.jobs.isSingleFetching;
export const jobsErrors = state => state.jobs.errorMessages;
export const getJobs = state => state.jobs.jobs;
export const getJobsPage = state => state.jobs.page;
export const getJobsTotalPages = state => Math.ceil(state.jobs.count / config.pagination.limit);
export const getJobsOrderBy = state => state.jobs.orderBy;
export const getJobsFilterBy = state => state.jobs.filterBy;
export const getSingleJob = (state, id) => state.jobs.jobs.find(job => job.address === id);
export const getSingleJobMemoized = createSelector(
    getSingleJob,
    job => job
);
