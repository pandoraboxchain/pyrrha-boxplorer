import { createSelector } from 'reselect';

export const isWorkersFetching = state => !!state.workers.isFetching;
export const isWorkerSinglesFetching = state => !!state.workers.isSingleFetching;
export const workersErrors = state => state.workers.errorMessages;
export const getWorkers = state => state.workers.workers;
export const getSingleWorker = (state, id) => state.workers.workers.find(worker => worker.address === id);
export const getSingleWorkerMemoized = createSelector(
    getSingleWorker,
    worker => worker
);
