import axios from 'axios';
import {store} from './store'
import { loginSuccess, logout } from './Slices/Slice';

//axios.defaults.baseURL = 'http://localhost:8000';

export const seminarHallAxios = axios.create({
    baseURL: 'http://localhost:8000',
  });

// Intercept requests to attach the access token on request header.
seminarHallAxios.interceptors.request.use(
    async (config) => {
        console.log('inside req interceptor');
        const state = store.getState();
        const token = state.seminarHall.accessToken;

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Intercept responses to handle token refresh
seminarHallAxios.interceptors.response.use(
    (response) => {
        console.log('inside success response  interceptor');
        return response;
    },
    async (error) => {
        console.log('inside error response  interceptor');
        const originalRequest = error.config;

        if ((error.response.status === 401 || error.response.status === 403) && !originalRequest._retry) {
            console.log('inside retry with refresh token');
            originalRequest._retry = true;

            const state = store.getState();
            const refreshToken = state.seminarHall.refreshToken;

            if (refreshToken) {
                try {
                    const response = await seminarHallAxios.post('/api/token/refresh/', { refresh: refreshToken });
                    const { access } = response.data;

                    store.dispatch(loginSuccess({ access: access, refresh: refreshToken }));
                    axios.defaults.headers.common['Authorization'] = `Bearer ${access}`;
                    originalRequest.headers['Authorization'] = `Bearer ${access}`;

                    return axios(originalRequest);
                } catch (error) {
                    store.dispatch(logout());
                    return Promise.reject(error);
                }
            } else {
                store.dispatch(logout());
            }
        }

        return Promise.reject(error);
    }
);