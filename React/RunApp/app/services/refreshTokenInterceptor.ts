import { AxiosRequestConfig } from 'axios';
import { axiosInstance } from './axiosInstance';
import { refreshAccessToken } from './apiLogin';
import { store } from '../utils/store';
import { clearUser, setUser } from '../features/registration/userSlice';

interface RetryQueueItem {
    resolve: (value?: any) => void;
    reject: (error?: any) => void;
    config: AxiosRequestConfig;
}

const refreshAndRetryQueue: RetryQueueItem[] = [];

let isRefreshing = false;

const userState = store.getState().user;

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest: AxiosRequestConfig = error.config;

        if(error.response && error.response.status === 401){
            if(!isRefreshing){
                isRefreshing = true;
                try{
                    const userWithRefreshToken = await refreshAccessToken(userState.token, userState.refreshToken);
                    store.dispatch(setUser(userWithRefreshToken))

                    error.config.headers['Authorization'] = `Bearer ${userWithRefreshToken.token}`;

                    refreshAndRetryQueue.forEach(({resolve, reject, config}) => {
                        axiosInstance
                        .request(config)
                        .then((response) => resolve(response))
                        .catch((err) => reject(err))
                    });

                    refreshAndRetryQueue.length = 0;

                    return axiosInstance(originalRequest);
                } catch{
                    store.dispatch(clearUser());
                    window.location.href = "/";
                } finally {
                    isRefreshing = false
                }
            }

            return new Promise<void>((resolve, reject) => {
                refreshAndRetryQueue.push({config: originalRequest, resolve, reject})
            });
        }

        return Promise.reject(error);
    }
)