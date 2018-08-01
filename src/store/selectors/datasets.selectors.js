import { createSelector } from 'reselect';
import config from '../../config';

export const isDatasetsFetching = state => !!state.datasets.isFetching;
export const isDatasetSinglesFetching = state => !!state.datasets.isSingleFetching;
export const datasetsErrors = state => state.datasets.errorMessages;
export const getDatasets = state => state.datasets.datasets;
export const getDatasetsPage = state => state.datasets.page;
export const getDatasetsTotalPages = state => Math.ceil(state.datasets.count / config.pagination.limit);
export const getDatasetsOrderBy = state => state.datasets.orderBy;
export const getDatasetsFilterBy = state => state.datasets.filterBy;
export const getSingleDataset = (state, id) => state.datasets.datasets.find(dataset => dataset.address === id);
export const getSingleDatasetMemoized = createSelector(
    getSingleDataset,
    dataset => dataset
);
