import config from '../config';

export const callApi = async (url) => {
    return await fetch(`${config.protocol}://${config.host}:${config.port}/${url}`)
        .then(res => res.json());
};
