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

let useHost = process.env.USE_DEFAULT || 'default';

const config = {
    ...hosts.default,
    ...hosts[useHost]
};

// env overrides
export default {
    protocol: process.env.REACT_APP_BOXPROXY_PROTOCOL || config.protocol,
    host: process.env.REACT_APP_BOXPROXY_HOST || config.host,
    port: process.env.REACT_APP_BOXPROXY_PORT || config.port,
    wsport: process.env.REACT_APP_BOXPROXY_WS_PORT || config.wsport
};
