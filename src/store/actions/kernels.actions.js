import { reduxAction as action } from '../../utils';

export const KERNELS_FETCH = 'KERNELS_FETCH';
export const KERNELS_RECEIVED = 'KERNELS_RECEIVED';
export const KERNELS_ERROR = 'KERNELS_ERROR';
export const KERNELS_MESSAGE = 'KERNELS_MESSAGE';
export const KERNELS_REMOVE_MESSAGE = 'KERNELS_REMOVE_MESSAGE';
export const KERNELS_REMOVE_ERROR = 'KERNELS_REMOVE_ERROR';
export const KERNELS_CLEAN_MESSAGES = 'KERNELS_CLEAN_MESSAGES';
export const KERNELS_CLEAN_ERRORS = 'KERNELS_CLEAN_ERRORS';
export const KERNELS_SINGLE_FETCH = 'KERNELS_SINGLE_FETCH';
export const KERNELS_SINGLE_RECIEVED = 'KERNELS_SINGLE_RECIEVED';

export const kernelsFetch = () => action(KERNELS_FETCH);
export const kernelsReceived = kernels => action(KERNELS_RECEIVED, { kernels });
export const kernelsError = error => action(KERNELS_ERROR, { error });
export const addKernelsMessage = message => action(KERNELS_MESSAGE, { message });
export const removeKernelsMessage = index => action(KERNELS_REMOVE_MESSAGE, { index });
export const removeKernelsError = index => action(KERNELS_REMOVE_ERROR, { index });
export const cleanKernelsMessages = () => action(KERNELS_CLEAN_MESSAGES);
export const cleanKernelsErrors = () => action(KERNELS_CLEAN_ERRORS);
export const fetchSingleKernel = address => action(KERNELS_SINGLE_FETCH, { address });
export const kernelSingleReceived = record => action(KERNELS_SINGLE_RECIEVED, { record });
