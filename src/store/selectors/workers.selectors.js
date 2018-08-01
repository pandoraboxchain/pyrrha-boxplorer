import { createSelector } from 'reselect';
import config from '../../config';

export const isWorkersFetching = state => !!state.workers.isFetching;
export const isWorkerSinglesFetching = state => !!state.workers.isSingleFetching;
export const workersErrors = state => state.workers.errorMessages;
export const getWorkers = state => state.workers.workers;
export const getWorkersPage = state => state.workers.page;
export const getWorkersTotalPages = state => Math.ceil(state.workers.count / config.pagination.limit);
export const getWorkersOrderBy = state => state.workers.orderBy;
export const getWorkersFilterBy = state => state.workers.filterBy;
export const getSingleWorker = (state, id) => state.workers.workers.find(worker => worker.address === id);
export const getSingleWorkerMemoized = createSelector(
    getSingleWorker,
    worker => worker
);
