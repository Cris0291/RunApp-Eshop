import { AccountSettingsForm, UserInfoQuery, AccountInfoResponse, PasswordUpdatedSettings, AddressSettingsForm, AddressResponse, PaymentSettingsForm} from "../features/profiles/userprofile/settings/contracts";
import { axiosInstance } from "./axiosInstance";


export async function GetuserInfo(token: string){
    return axiosInstance.get<UserInfoQuery>("api/user/account", {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }).then(response => response.data);

}

export async function UpdateAccountInfo({accountInfo, token} : {accountInfo: AccountSettingsForm, token: string}){
    const accountSettings = {Name: accountInfo.name, Email: accountInfo.email, NickName: accountInfo.username};

    return axiosInstance.put<AccountInfoResponse>("api/user/account-info", accountSettings, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }).then(response => response.data);
}

export async function UpdatePasswordInfo({passwordInfo, token}: {passwordInfo: PasswordUpdatedSettings, token: string}){

    return axiosInstance.put<number>("api/user/password", passwordInfo, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }).then(response => response.status);

}

export async function CreateAddressInfo({addressInfo, token}: {addressInfo: AddressSettingsForm, token: string}){
    return axiosInstance.post<AddressResponse>("api/user/address", addressInfo, {
        headers:{
            "Authorization": `Bearer ${token}`
        }
    }).then(response => response.data)

}

export async function UpdateAddressInfo({addressInfo, token}: {addressInfo: AddressSettingsForm, token: string}){
    return axiosInstance.put<AddressResponse>("api/user/address", addressInfo, {
        headers:{
            "Authorization": `Bearer ${token}`
        }
    }).then(response => response.data)
}

export async function CreatePaymentMethod({paymentInfo, token}: {paymentInfo: PaymentSettingsForm, token: string}){
    return axiosInstance.post<number>("api/user/payment", paymentInfo, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }).then(response => response.status);

}

export async function UpdatePaymentMethod({paymentInfo, token}: {paymentInfo: PaymentSettingsForm, token: string}){
    return axiosInstance.put<number>("api/user/payment", paymentInfo, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }).then(response => response.status);

}