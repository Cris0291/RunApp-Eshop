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
    if (tokenModel !== undefined) {
      config.headers.Authorization = `Bearer ${tokenModel.token}`;
    }
    console.log(config);
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

    if (
      error.response &&
      error.response.status === 401 &&
      tokenModel !== undefined
    ) {
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const data = await refreshAccessToken(
            tokenModel.token,
            tokenModel.refreshToken
          );

          const userSession: UserDto = {
            token: data.token,
            refreshToken: data.refreshToken,
            refreshTokenExpirationDate: data.refreshTokenExpirationDate,
            name: data.name,
            userName: data.userName,
            email: data.email,
          };
          Cookies.remove("Session");
          Cookies.set("Session", JSON.stringify(userSession));

          error.config.headers["Authorization"] = `Bearer ${data.token}`;

          refreshAndRetryQueue.forEach(({ resolve, reject, config }) => {
            axiosInstance
              .request(config)
              .then((response) => resolve(response))
              .catch((err) => reject(err));
          });

          refreshAndRetryQueue.length = 0;
          console.log("refresh");
          return axiosInstance(originalRequest);
        } catch {
          Cookies.remove("Session");
          store.dispatch(clearUser());
          window.location.href = "/";
        } finally {
          isRefreshing = false;
        }
      }

      return new Promise<void>((resolve, reject) => {
        refreshAndRetryQueue.push({ config: originalRequest, resolve, reject });
      });
    }

    return Promise.reject(error);
  }
);
