const hosts = {
    default: {
        protocol: 'http',
        host: 'api.pandora.network',
        port: 1111,
        wsport: 1337
    },
    local: {
        protocol: 'http',
        host: 'localhost',
        port: 1111,
        wsport: 1337
    }
};

let useHost = process.env.REACT_APP_USE_HOST || 'default';

const config = {
    ...hosts.default,
    ...hosts[useHost]
};

// env overrides
export default {
    wsReconnectTimeout: 2000,
    wsReconnectCount: 20,
    protocol: process.env.REACT_APP_BOXPROXY_PROTOCOL || config.protocol,
    host: process.env.REACT_APP_BOXPROXY_HOST || config.host,
    port: process.env.REACT_APP_BOXPROXY_PORT || config.port,
    wsport: process.env.REACT_APP_BOXPROXY_WS_PORT || config.wsport
};
