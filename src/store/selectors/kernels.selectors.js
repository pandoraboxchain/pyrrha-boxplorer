import { createSelector } from 'reselect';
import config from '../../config'

export const isKernelsFetching = state => !!state.kernels.isFetching;
export const isKernelSinglesFetching = state => !!state.kernels.isSingleFetching;
export const kernelsErrors = state => state.kernels.errorMessages;
export const getKernels = state => state.kernels.kernels;
export const getKernelsPage = state => state.kernels.page;
export const getKernelsTotalPages = state => Math.ceil(state.kernels.count / config.pagination.limit);
export const getKernelsOrderBy = state => state.kernels.orderBy;
export const getKernelsFilterBy = state => state.kernels.filterBy;
export const getSingleKernel = (state, id) => state.kernels.kernels.find(kernel => kernel.address === id);
export const getSingleKernelMemoized = createSelector(
    getSingleKernel,
    kernel => kernel
);
