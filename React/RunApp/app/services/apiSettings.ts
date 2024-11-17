import axios from "axios"
import { AccountSettingsForm, UserInfoQuery, AccountInfoResponse, PasswordUpdatedSettings, AddressSettingsForm, AddressResponse, PaymentSettingsForm} from "../features/profiles/userprofile/settings/contracts";

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

    return axios.put<void>("api/user/password", passwordInfo, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })

}

export async function CreateAddressInfo({addressInfo, token}: {addressInfo: AddressSettingsForm, token: string}){
    return axios.post<AddressResponse>("api/user/address", addressInfo, {
        headers:{
            "Authorization": `Bearer ${token}`
        }
    }).then(response => response.data)

}

export async function UpdateAddressInfo({addressInfo, token}: {addressInfo: AddressSettingsForm, token: string}){
    return axios.put<AddressResponse>("api/user/address", addressInfo, {
        headers:{
            "Authorization": `Bearer ${token}`
        }
    }).then(response => response.data)
}

export async function CreatePaymentMethod({paymentInfo, token}: {paymentInfo: PaymentSettingsForm, token: string}){
    return axios.post<void>("api/user/payment", paymentInfo, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }).then(response => response.data);

}

export async function UpdatePaymentMethod({paymentInfo, token}: {paymentInfo: PaymentSettingsForm, token: string}){
    return axios.put<void>("api/user/payment", paymentInfo, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }).then(response => response.data);

}