import axios, { AxiosRequestConfig } from "axios";
import { TokenModel } from "../features/registration/contracts";
import { refreshAccessToken } from "./apiLogin";
import { store } from "../utils/store";
import { clearUser } from "../features/registration/userSlice";
import Cookies from "js-cookie";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

interface RetryQueueItem {
  resolve: (value?: any) => void;
  reject: (error?: any) => void;
  config: AxiosRequestConfig;
}

axiosInstance.interceptors.request.use(
  function (config) {
    const tokenModelJson = Cookies.get("Token");
    const tokenModel: TokenModel =
      tokenModelJson !== undefined ? JSON.parse(tokenModelJson) : undefined;
    if (tokenModel !== undefined) {
      config.headers.Authorization = `Bearer ${tokenModel.token}`;
    }

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
    const tokenModelJson = Cookies.get("Token");
    const tokenModel: TokenModel =
      tokenModelJson !== undefined ? JSON.parse(tokenModelJson) : undefined;
    const originalRequest: AxiosRequestConfig = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      tokenModel !== undefined
    ) {
      try {
        const data = await refreshAccessToken(
          tokenModel.token,
          tokenModel.refreshToken
        );

        const token: TokenModel = {
          token: data.token,
          refreshToken: data.refreshToken,
          refreshTokenExpirationDate: data.refreshTokenExpirationDate,
        };

        Cookies.set("Token", JSON.stringify(token));

        error.config.headers["Authorization"] = `Bearer ${data.token}`;

        return axiosInstance(originalRequest);
      } catch {
        Cookies.remove("Session");
        store.dispatch(clearUser());

        //window.location.href = "/";
      }
    }

    return Promise.reject(error);
  }
);
