export const convertJobStatusCode = code => {

    switch (Number(code)) {
        case 1: return 'Gathering workers';
        case 2: return 'Insufficient workers';
        case 3: return 'Data validation';
        case 4: return 'Invalid data';
        case 5: return 'Cognition';
        case 6: return 'Partial result';
        case 7: return 'Completed';
        case -1: return 'Not assigned';
        default: return 'Unknown';
    }
};

export const convertWorkerStatusCode = (code) => {

    switch (Number(code)) {
        case 1: return 'Offline';
        case 2: return 'Idle';
        case 3: return 'Assigned';
        case 4: return 'Ready for data validation';
        case 5: return 'Validating data';
        case 6: return 'Ready for computing';
        case 7: return 'Computing';
        case 8: return 'Insufficient stake';
        case 9: return 'Under penalty';
        default: return 'Unknown';
    }
}
