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

export type ProductRequestDto = {
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

export type ProductResponseDto = {
    productId: string,
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

export type newPromotionDto = {
    newPriceWithDiscount: number,
    newPromotionalText: string,
}