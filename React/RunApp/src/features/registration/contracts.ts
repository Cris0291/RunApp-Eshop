import {
  AddressResponse,
  AddressSettingsForm,
  PaymentSettingsForm,
} from "../payment/checkout/contracts";

export type FormValues = {
  name: string;
  username: string;
  email: string;
  password: string;
  confirm: string;
};

export type UserDto = {
  name: string;
  email: string;
  userName: string;
  token: string;
  refreshToken: string;
  refreshTokenExpirationDate: string;
};

export type UpdateUserDto = {
  name: string;
  email: string;
  userName: string;
};

export interface User {
  name: string;
  email: string;
  userName: string;
  token: string;
  id: string;
}

export type UserWithSettingsDto = {
  name: string;
  email: string;
  userName: string;
  address?: AddressSettingsForm;
  card?: PaymentSettingsForm;
};

export type TokenModel = {
  token: string;
  refreshToken: string;
  refreshTokenExpirationDate: string;
};

export type UserSession = {
  name: string;
  email: string;
  userName: string;
};

export type UserDtoWithToken = {
  email: string;
  username: string;
  name: string;
  address: string | null;
  city: string | null;
  state: string | null;
  zipcode: string | null;
  country: string | null;
  cardnumber: string | null;
  cardname: string | null;
  expirydate: string | null;
  cvv: string | null;
  token: string;
  refreshToken: string;
  refreshTokenExpirationDate: string;
};
