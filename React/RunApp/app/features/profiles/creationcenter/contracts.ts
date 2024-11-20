export type ProductCreationDto = {
    name: string,
    description: string,
    price: number,
    bulletPoints: string[],
    priceWithDiscount?: number,
    promotionalText?: string,
    categories: string[],
    brand: string,
    color: string,
    weight: number,
    type: string
}

export type CharacteristicsDto = {
    brand: string,
    color: string,
    weight: number,
    type: string
}