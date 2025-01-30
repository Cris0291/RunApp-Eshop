import axios, { AxiosRequestConfig } from "axios";
import { TokenModel } from "../features/registration/contracts";
import { refreshAccessToken } from "./apiLogin";
import { store } from "../utils/store";
import { clearUser } from "../features/registration/userSlice";
import Cookies from "js-cookie";

export const axiosInstance = axios.create({ baseURL: "http://localhost:5253" });

interface RetryQueueItem {
  resolve: (value?: any) => void;
  reject: (error?: any) => void;
  config: AxiosRequestConfig;
}

axiosInstance.interceptors.request.use(
  function (config) {
    console.log("intercepted 1");
    const tokenModelJson = Cookies.get("Token");
    const tokenModel: TokenModel =
      tokenModelJson !== undefined ? JSON.parse(tokenModelJson) : undefined;
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
    const tokenModelJson = Cookies.get("Token");
    const tokenModel: TokenModel =
      tokenModelJson !== undefined ? JSON.parse(tokenModelJson) : undefined;
    const originalRequest: AxiosRequestConfig = error.config;
    console.log("response 1");
    if (
      error.response &&
      error.response.status === 401 &&
      tokenModel !== undefined
    ) {
      console.log("refresh 1");
      try {
        console.log("problem 1");
        const data = await refreshAccessToken(
          tokenModel.token,
          tokenModel.refreshToken
        );
        console.log("problem 2");

        const token: TokenModel = {
          token: data.token,
          refreshToken: data.refreshToken,
          refreshTokenExpirationDate: data.refreshTokenExpirationDate,
        };

        Cookies.set("Token", JSON.stringify(token));
        console.log("refresh 2");
        error.config.headers["Authorization"] = `Bearer ${data.token}`;

        console.log("refresh 3");
        return axiosInstance(originalRequest);
      } catch {
        console.log("refresh 4");
        Cookies.remove("Session");
        store.dispatch(clearUser());
        console.log("refresh 5");
        //window.location.href = "/";
        console.log("refresh 6");
      }
    }
    console.log("response 2");
    return Promise.reject(error);
  }
);
