import { FormValues, UserDto } from "../features/registration/contracts";
import { axiosInstance } from "./axiosInstance";



export default function registerRequest(register : FormValues){
    return axiosInstance.post<UserDto>("api/accounts/register", register).then (response => response.data);
}