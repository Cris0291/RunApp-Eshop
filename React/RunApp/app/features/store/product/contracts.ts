export type Product = {
    productId: string,
    name: string,
    description: string,
    actualPrice: number,
    bulletPoints: string[],
    priceWithDiscount: number | undefined,
    promotionalText: string | undefined,
    discount: number | undefined,
    numberOfreviews: number | undefined,
    numberOflikes: number | undefined,
    averageRating: number,
    reviews: Review[],
    mainImage?: string,
    categories: string[],
}

export type Review = {
    id: string,
    userName: string
    comment: string,
    date: string,
    reviewDescription: string,
    rating: number
}


export type Image = {
    imageId: string,
    productId: string,
    url: string
}

export type ReviewDto = {
    comment: string,
    reviewDescription: string,
    rating: number
}
