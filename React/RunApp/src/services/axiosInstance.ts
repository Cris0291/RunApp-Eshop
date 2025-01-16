import axios, { AxiosRequestConfig } from "axios";
import {
  TokenModel,
  UserDto,
  UserSession,
} from "../features/registration/contracts";
import { refreshAccessToken } from "./apiLogin";
import { store } from "../utils/store";
import { clearUser } from "../features/registration/userSlice";
import Cookies from "js-cookie";

export const axiosInstance = axios.create({ baseURL: "http://localhost:5253" });

const tokenModelJson = Cookies.get("Session");
const tokenModel: TokenModel =
  tokenModelJson !== undefined ? JSON.parse(tokenModelJson) : undefined;

interface RetryQueueItem {
  resolve: (value?: any) => void;
  reject: (error?: any) => void;
  config: AxiosRequestConfig;
}

const refreshAndRetryQueue: RetryQueueItem[] = [];

let isRefreshing = false;

axiosInstance.interceptors.request.use(
  function (config) {
    console.log("intercepted 1");

    if (tokenModel !== undefined) {
      config.headers.Authorization = `Bearer ${tokenModel.token}`;
      console.log("intercepted 3");
      console.log(tokenModel.token);
    }
    console.log("intercepted 2");
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const originalRequest: AxiosRequestConfig = error.config;
    console.log("response 1");
    if (
      error.response &&
      error.response.status === 401 &&
      tokenModel !== undefined
    ) {
      if (!isRefreshing) {
        isRefreshing = true;
        console.log("refresh 1");
        try {
          console.log("problem 1");
          const data = await refreshAccessToken(
            tokenModel.token,
            tokenModel.refreshToken
          );
          console.log("problem 2");
          const userSession: UserDto = {
            token: data.token,
            refreshToken: data.refreshToken,
            refreshTokenExpirationDate: data.refreshTokenExpirationDate,
            name: data.name,
            userName: data.userName,
            email: data.email,
          };

          Cookies.set("Session", JSON.stringify(userSession));
          console.log("refresh 2");
          error.config.headers["Authorization"] = `Bearer ${data.token}`;

          refreshAndRetryQueue.length = 0;
          console.log("refresh 3");
          return axiosInstance(originalRequest);
        } catch {
          console.log("refresh 4");
          Cookies.remove("Session");
          store.dispatch(clearUser());
          console.log("refresh 5");
          //window.location.href = "/";
          console.log("refresh 6");
        } finally {
          isRefreshing = false;
        }
      }
    }
    console.log("response 2");
    return Promise.reject(error);
  }
);
