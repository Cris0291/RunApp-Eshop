export type ProductForCart = {
  id: string;
  name: string;
  quantity: number | null;
  price: number;
  priceWithDiscount: number | null;
  totalPrice: number;
  image?: string;
};

export type ProductForLineItem = {
  id: string;
  name: string;
  quantity: number | null;
  price: number;
  priceWithDiscount: number | null;
  totalPrice: number;
};

export type CartProductsResponse = {
  productId: string;
  lineItemId: string;
  name: string;
  quantity: number;
  price: number;
  priceWithDiscount: number | null;
  totalPrice: number;
};

export type DeleteItemDto = {
  ProductId: string;
};

export type ChangeItemQuantityRequestDto = {
  quantity: number;
  productId: string;
};
