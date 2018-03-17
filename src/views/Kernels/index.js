import Loadable from 'react-loadable';
import Loading from '../../components/Loading'

const LoadableKernels = Loadable({
    loader: () => import('./Kernels'),
    loading: Loading,
});

export const route = {
    path: '/kernels',
    exact: false,
    label: 'Kernels',
    component: LoadableKernels
};
