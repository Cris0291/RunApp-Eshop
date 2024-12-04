export type ProductForCart = {
    id: string,
    name: string,
    quantity: number | null,
    price: number,
    priceWithDiscount: number | undefined,
    totalPrice: number,
    image: string
}

export type CartProductsResponse = {
    id: string,
    name: string,
    quantity: number,
    price: number,
    priceWithDiscount: number | undefined,
    totalPrice: number,
    image: string
}

export type DeleteItemDto ={
    ProductId: string
}

export type ChangeItemQuantityRequestDto = {
    quantity: number,
    productId: string
}