import config from '../config';

export const callApi = async (url) => {

    return await fetch(`${config.protocol}://${config.host}:${config.port}/${url}`)
        .then(res => res.json());
};

export const socketOn = () => new Promise((resolve, reject) => {
    const connection = new WebSocket(`ws://${config.host}:${config.wsport}`);

    const validateConnection = () => {
        switch (connection.readyState) {
            case connection.OPEN: 
                resolve(connection);
                break;
            case connection.CLOSED:
                reject(new Error('Connection not opened'));
                break;
            case connection.CONNECTING:
            case connection.CLOSING:
                setTimeout(validateConnection, 5);
                break;
            default:
                reject(new Error('Unknown connection readyState'));
        }
    };

    validateConnection();
});
