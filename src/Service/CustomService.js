import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://localhost:7052/',
});

// Request interceptor
instance.interceptors.request.use(
    function (config) {
        // Modify the request configuration here if needed
        return config;
    },
    function (error) {
        return Promise.reject(error);
    },
);

// Response interceptor
instance.interceptors.response.use(
    function (response) {
        // Modify the response or extract data if needed
        return response && response.data ? response.data : response;
    },
    function (error) {
        return error && error.response && error.response.data ? error.response.data : Promise.reject(error);
    },
);

export default instance;
