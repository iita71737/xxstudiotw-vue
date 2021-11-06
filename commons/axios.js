import _axios from 'axios';

const axios = baseURL => {

    const instance = _axios.create({
        baseURL:
            baseURL || process.env.VUE_APP_API_DOMAIN || 'http://localhost:3003',
        timeout: 1000
    });

    return instance;

};

export { axios };

export default axios();