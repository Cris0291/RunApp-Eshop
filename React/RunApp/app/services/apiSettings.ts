import axios from "axios"
import { AccountSettingsForm, UserInfoQuery, AccountInfoResponse, PasswordUpdatedSettings} from "../features/profiles/userprofile/settings/contracts";
import { headers } from "next/headers";

axios.defaults.baseURL = "http://localhost:5253";

export async function GetuserInfo(token: string){
    return axios.get<UserInfoQuery>("api/user/account", {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }).then(response => response.data);

}

export async function UpdateAccountInfo({accountInfo, token} : {accountInfo: AccountSettingsForm, token: string}){
    const accountSettings = {Name: accountInfo.name, Email: accountInfo.email, NickName: accountInfo.username};

    return axios.put<AccountInfoResponse>("api/user/account-info", accountSettings, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }).then(response => response.data);
}

export async function UpdatePasswordInfo({passwordInfo, token}: {passwordInfo: PasswordUpdatedSettings, token: string}){

    axios.put<void>("api/user/password", passwordInfo, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })

}