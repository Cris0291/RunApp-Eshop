import {
  AccountSettingsForm,
  UserInfoQuery,
  AccountInfoResponse,
  PasswordUpdatedSettings,
  AddressSettingsForm,
  PaymentSettingsForm,
} from "../features/profiles/userprofile/settings/contracts";
import { axiosInstance } from "./axiosInstance";

export async function GetuserInfo() {
  return axiosInstance
    .get<UserInfoQuery>("api/user/account")
    .then((response) => response.data);
}

export async function UpdateAccountInfo({
  accountInfo,
}: {
  accountInfo: AccountSettingsForm;
}) {
  const accountSettings = {
    Name: accountInfo.name,
    OldEmail: accountInfo.oldemail,
    NewEmail: accountInfo.newemail,
    NickName: accountInfo.username,
  };

  return axiosInstance
    .put<AccountInfoResponse>("api/user/account-info", accountSettings)
    .then((response) => response.data);
}

export async function UpdatePasswordInfo({
  passwordInfo,
}: {
  passwordInfo: PasswordUpdatedSettings;
}) {
  return axiosInstance
    .post<number>("api/user/password", passwordInfo)
    .then((response) => response.status);
}

export async function CreateAddressInfo({
  addressInfo,
}: {
  addressInfo: AddressSettingsForm;
}) {
  return axiosInstance
    .post<AddressSettingsForm>("api/user/address", addressInfo)
    .then((response) => response.data);
}

export async function UpdateAddressInfo({
  addressInfo,
}: {
  addressInfo: AddressSettingsForm;
}) {
  return axiosInstance
    .put<AddressSettingsForm>("api/user/address", addressInfo)
    .then((response) => response.data);
}

export async function CreatePaymentMethod({
  paymentInfo,
}: {
  paymentInfo: PaymentSettingsForm;
}) {
  return axiosInstance
    .post<PaymentSettingsForm>("api/user/payment", paymentInfo)
    .then((response) => response.data);
}

export async function UpdatePaymentMethod({
  paymentInfo,
}: {
  paymentInfo: PaymentSettingsForm;
}) {
  return axiosInstance
    .put<PaymentSettingsForm>("api/user/payment", paymentInfo)
    .then((response) => response.data);
}
