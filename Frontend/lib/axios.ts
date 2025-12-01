import axios from 'axios';
import Cookies from 'js-cookie';
import { BASE_API_ROUTE } from '@/app/RoutesName/Routes';
import { access } from 'fs';

const baseURL = BASE_API_ROUTE;

const privateAgent = axios.create({
    baseURL,
})

const publicAgent = axios.create({
    baseURL,
})

// will run when you are sending request
privateAgent.interceptors.request.use(
    (config) => {
        const accessToken = Cookies.get('access_token');

        if (accessToken && config.headers) {
            config.headers['Authorization'] = `Bearer ${accessToken}`
        }
        return config;
    },
    (error) => {
        console.error('Request Error: ', error.response?.data?.message || error.message);
        return Promise.reject(error);
    }
)

privateAgent.interceptors.response.use(
    (response) => response, 
    async (error) => {
        console.error('Response Error:', error);
        const originalRequst = error.config;
        if (error.response?.status === 401 && !originalRequst._retry) {
            originalRequst._retry = true;
            const refreshToken = Cookies.get('refreshToken');
            console.log('Refresh Token: ', refreshToken);

            if(!refreshToken) return Promise.reject(error);

            // try{
            //     const response = await axios.post(route)
            // }
        }
    }
)

export { privateAgent, publicAgent}