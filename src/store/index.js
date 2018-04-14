import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import { createPersistStorageFilter } from '../utils';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage/session';
import packageConfig from '../../package.json';

import rootReducer from './reducers';
import rootSaga from './sagas';

// Filter persitent state for connect reducer
// these states will not been rehydrated after app reloading
const kernelsBacklist = createPersistStorageFilter(
    'kernels',
    [
        'isFetching',
        'isSingleFetching'
    ]
);
const datasetsBacklist = createPersistStorageFilter(
    'datasets',
    [
        'isFetching',
        'isSingleFetching'
    ]
);
const workersBacklist = createPersistStorageFilter(
    'workers',
    [
        'isFetching',
        'isSingleFetching'
    ]
);
const jobsBacklist = createPersistStorageFilter(
    'jobs',
    [
        'isFetching',
        'isSingleFetching'
    ]
);

const persistConfig = {
    debug: process.env.NODE_ENV !== 'production',
    key: packageConfig.name,
    storage,
    stateReconciler: autoMergeLevel2,
    transforms: [
        kernelsBacklist,
        datasetsBacklist,
        workersBacklist,
        jobsBacklist
    ],
    blacklist: ['router', 'websocket'] // exclude some states
};

export const history = createHistory();

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? 
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : 
    compose;
const combinedReducers = combineReducers({
    router: routerReducer,
    ...rootReducer
});
const persistedReducer = persistReducer(persistConfig, combinedReducers);

export const store = createStore(
    persistedReducer,
    undefined,
    composeEnhancers(applyMiddleware(sagaMiddleware, routerMiddleware(history)))
);

export const persistor = persistStore(store, null, () => {});

sagaMiddleware.run(rootSaga);
