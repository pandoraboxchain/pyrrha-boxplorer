import config from '../config';

export const callApi = async (url, options = {}) => {
    const query = [];
    let orderRules = '';
    let filterRules = '';
    query.push(`page=${options.page || 1}`);

    if (options.orderBy && Object.keys(options.orderBy).length > 0) {

        orderRules = Object.keys(options.orderBy)
            .map(key => `${key}:${options.orderBy[key] === 'ascending' ? 'ASC' : 'DESC'}`)
            .join(';');
        query.push(`orderBy=${orderRules}`);
    }

    console.log('>>>', options.filterBy)

    if (options.filterBy && Object.keys(options.filterBy).length > 0) {

        filterRules = Object.keys(options.filterBy)
            .map(key => `${key}:like:${options.filterBy[key]}`)
            .join(';');
        query.push(`filterBy=${filterRules}`);
    }
    
    return await fetch(`${config.protocol}://${config.host}:${config.port}/${url}?${query.length > 0 ? query.join('&') : ''}`)
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
