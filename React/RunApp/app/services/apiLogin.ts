import axios from "axios";
import { LoginFormValues } from "../features/login/contracts";
import { UserDto } from "../features/registration/contracts";

axios.defaults.baseURL = "http://localhost:5253"; 

export default function loginRequest(login : LoginFormValues) : Promise<UserDto>{
    return axios.post("api/accounts/login", login).then(response => response.data)
}