export type ProductCreationDto = {
    name: string,
    description: string,
    price: number,
    bulletPoints: string[],
    priceWithDiscount?: number,
    promotionalText?: string,
    categories: string[],
    characteristics: CharacteristicsDto
}

export type CharacteristicsDto = {
    brand: string,
    color: string,
    weight: number,
    type: string
}