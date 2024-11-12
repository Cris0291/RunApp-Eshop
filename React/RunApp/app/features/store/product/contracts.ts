export type Product = {
    id: string,
    name: string,
    description: string,
    price: number,
    bulletPoints: string[],
    priceWithDiscount: number | undefined,
    promotionalText: string | undefined,
    discount: number | undefined,
    numberOfreviews: number,
    averageRating: number,
    reviews: Review[],
    images: Image[],
}

export type Review = {
    comment: string,
    date: string,
    reviewDescription: string,
    rating: number
}


export type Image = {
    id: string,
    url: string
}

export type ReviewDto = {
    comment: string,
    reviewDescription: string,
    rating: number
}
