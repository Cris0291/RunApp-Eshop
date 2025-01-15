import { CartProductsResponse, ProductForCart } from "../shoppingcart/contracts"

export type AddressSettingsForm = {
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

  export type OrderDto = {
    CardRequest?: PaymentSettingsForm,
    AddressRequest?: AddressSettingsForm,
  }

  export type OrderResponse = {
    OrderId: string,
    CardRequest?: PaymentSettingsForm,
    AddressRequest?: AddressSettingsForm,
  }

  export type AddressResponse = {
    address: string,
    city: string,
    state: string,
    zipcode: string,
    country: string,
  }

  export type PaymentResponse = {
    cardnumber: string,
    cardname: string,
    expirydate: string,
    cvv: string,
  }

  export type OrderWithItems = {
    OrderId: string,
    CardRequest?: PaymentSettingsForm,
    AddressRequest?: AddressSettingsForm,
    Items: CartProductsResponse[],
  }

  export type CurrentOrderWrapper = {
    order?: OrderWithItems
  }