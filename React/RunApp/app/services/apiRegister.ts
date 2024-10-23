import axios from "axios";
import { FormValues, UserDto } from "../features/registration/contracts";

axios.defaults.baseURL = "http://localhost:5253"; 


export default function registerRequest(register : FormValues): Promise<UserDto>{
    return axios.post("api/accounts/register", register).then (response => response.data);
}