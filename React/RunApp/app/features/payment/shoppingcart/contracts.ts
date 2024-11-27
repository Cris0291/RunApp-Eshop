export type ProductForCart = {
    id: string,
    name: string,
    quantity: number,
    price: number,
    priceWithDiscount: number | undefined,
    totalPrice: number,
    image: string
}