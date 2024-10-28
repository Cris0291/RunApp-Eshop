export type ProductForCart = {
    id: string,
    quantity: number,
    price: number,
    priceWithDiscount: number | undefined,
    totalPrice: number
}