import Loadable from 'react-loadable';
import Loading from '../../components/Loading'

const LoadableWorkers = Loadable({
    loader: () => import('./Workers'),
    loading: Loading,
});

export const route = {
    path: '/workers',
    exact: false,
    label: 'Workers',
    component: LoadableWorkers
};
