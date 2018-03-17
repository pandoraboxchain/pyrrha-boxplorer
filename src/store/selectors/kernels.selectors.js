import { createSelector } from 'reselect';

export const isKernelsFetching = state => !!state.kernels.isFetching;
export const kernelsErrors = state => state.kernels.errorMessages;
export const getKernels = state => state.kernels.kernels;
export const getSingleKernel = (state, id) => state.kernels.kernels.find(kernel => kernel.address === id);
export const getSingleKernelMemoized = createSelector(
    getSingleKernel,
    kernel => kernel
);
