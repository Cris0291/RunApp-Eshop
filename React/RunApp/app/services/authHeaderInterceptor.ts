import { TokenModel } from '../features/registration/contracts';
import { axiosInstance } from './axiosInstance';

const tokenModelJson = localStorage.getItem("tokenModel");
const tokenModel: TokenModel = tokenModelJson !== null ? JSON.parse(tokenModelJson) : null;

axiosInstance.interceptors.request.use(
    function(config){
        if(tokenModel !== undefined){
            config.headers.Authorization = `Bearer ${tokenModel.token}`
        }
        console.log(config)
        return config
    },
    function (error){
        console.log("int header out")
        return Promise.reject(error);
    }
);