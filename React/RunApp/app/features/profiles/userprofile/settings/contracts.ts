
  export type AccountSettingsForm = {
    email: string,
    confirmemail: string,
    username: string,
    name: string,
    
  }

  export type AddressSettingsForm = {
    address: string,
    city: string,
    state: string,
    zipcode: string,
    country: string,
  }

  
  export type AddressResponse = {
    address: string,
    city: string,
    state: string,
    zipcode: string,
    country: string,
  }

  export type PaymentSettingsForm = {
    cardnumber: string,
    cardname: string,
    expirydate: string,
    cvv: string,
  }

  export type PasswordSettingsForm = {
    password: string,
    confirmpassword: string,
  }

  export type PasswordUpdatedSettings = {
    password: string,
    email:string
  }

  export type UserInfoQuery = {
    email: string,
    username: string,
    name: string,
    password: string,
    address: string,
    city: string,
    state: string,
    zipcode: string,
    country: string,
    cardnumber: string,
    cardname: string,
    expirydate: string,
    cvv: string,
  }

  export type AccountInfoResponse = {
    email: string,
    username: string,
    name: string,
  }