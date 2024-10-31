import axios from 'axios';

const url = import.meta.env.VITE_BASE_URL;

const axiosInstance = axios.create({
    baseURL: url,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;
