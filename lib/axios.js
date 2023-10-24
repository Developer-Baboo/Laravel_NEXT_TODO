import Axios from 'axios';

const axiosInstance = Axios.create({
    baseURL: process.env.BACKEND_URL,
    headers: {
        'X-Requested-With': 'XMLHttpRequest'
    },
    withCredentials: true
});

export default axiosInstance;