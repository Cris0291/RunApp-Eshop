import { LoginFormValues } from "../features/login/contracts";
import { UserDto, UserDtoWithToken } from "../features/registration/contracts";
import { axiosInstance } from "./axiosInstance";

export default function loginRequest(login: LoginFormValues) {
  return axiosInstance
    .post<UserDtoWithToken>("api/accounts/login", login)
    .then((response) => response.data);
}

export async function refreshAccessToken(token: string, refreshToken: string) {
  return axiosInstance
    .post<UserDto>("api/accounts/generate-token", {
      Token: token,
      RefreshToken: refreshToken,
    })
    .then((response) => response.data);
}
