export type AccountSettingsForm = {
  newemail: string;
  confirmnewemail: string;
  oldemail: string;
  confirmoldemail: string;
  username: string;
  name: string;
};

export type AddressSettingsForm = {
  address: string;
  city: string;
  state: string;
  zipcode: string;
  country: string;
};

export type PaymentSettingsForm = {
  cardnumber: string;
  cardname: string;
  expirydate: string;
  cvv: string;
};

export type PasswordSettingsForm = {
  oldpassword: string;
  newpassword: string;
  confirmoldpassword: string;
  confirmnewpassword: string;
};

export type PasswordUpdatedSettings = {
  oldpassword: string;
  newpassword: string;
  email: string;
};

export type UserInfoQuery = {
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
};

export type AccountInfoResponse = {
  email: string;
  nickname: string;
  name: string;
};
