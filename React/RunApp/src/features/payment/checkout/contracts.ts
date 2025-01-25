import { CartProductsResponse } from "../shoppingcart/contracts";

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

export type OrderDto = {
  cardRequest: PaymentSettingsForm | null;
  addressRequest: AddressSettingsForm | null;
};

export type OrderResponse = {
  orderId: string;
  cardRequest: PaymentSettingsForm | null;
  addressRequest: AddressSettingsForm | null;
};

export type AddressResponse = {
  address: string;
  city: string;
  state: string;
  zipcode: string;
  country: string;
};

export type PaymentResponse = {
  cardnumber: string;
  cardname: string;
  expirydate: string;
  cvv: string;
};

export type OrderWithItems = {
  orderId: string;
  cardRequest: PaymentSettingsForm | null;
  addressRequest: AddressSettingsForm | null;
  items: CartProductsResponse[];
};

export type CurrentOrderWrapper = {
  order: OrderWithItems | null;
};
