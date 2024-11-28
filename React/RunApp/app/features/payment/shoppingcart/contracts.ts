export type ProductForCart = {
    id: string,
    name: string,
    quantity: number | null,
    price: number,
    priceWithDiscount: number | undefined,
    totalPrice: number,
    image: string
}