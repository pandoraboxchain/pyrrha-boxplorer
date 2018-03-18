import Loadable from 'react-loadable';
import Loading from '../../components/Loading'

const LoadableJobs = Loadable({
    loader: () => import('./Jobs'),
    loading: Loading,
});

export const route = {
    path: '/jobs',
    exact: false,
    label: 'Jobs',
    component: LoadableJobs
};
