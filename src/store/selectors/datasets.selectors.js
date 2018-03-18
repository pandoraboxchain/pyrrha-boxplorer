import { createSelector } from 'reselect';

export const isDatasetsFetching = state => !!state.datasets.isFetching;
export const isDatasetSinglesFetching = state => !!state.datasets.isSingleFetching;
export const datasetsErrors = state => state.datasets.errorMessages;
export const getDatasets = state => state.datasets.datasets;
export const getSingleDataset = (state, id) => state.datasets.datasets.find(dataset => dataset.address === id);
export const getSingleDatasetMemoized = createSelector(
    getSingleDataset,
    dataset => dataset
);
