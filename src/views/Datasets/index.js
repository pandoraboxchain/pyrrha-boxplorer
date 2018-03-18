import Loadable from 'react-loadable';
import Loading from '../../components/Loading'

const LoadableDatasets = Loadable({
    loader: () => import('./Datasets'),
    loading: Loading,
});

export const route = {
    path: '/datasets',
    exact: false,
    label: 'Datasets',
    component: LoadableDatasets
};
