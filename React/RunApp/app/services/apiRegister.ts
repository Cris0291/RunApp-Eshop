import { FormValues, UserDto } from "../features/registration/contracts";
import { axiosInstance } from "./axiosInstance";



export default function registerRequest(register : FormValues){
    return axiosInstance.post<UserDto>("api/accounts/register", {userName: register.name, nickName: register.username, password: register.password, confirmPassword: register.confirm, email: register.email}).then (response => response.data);
}