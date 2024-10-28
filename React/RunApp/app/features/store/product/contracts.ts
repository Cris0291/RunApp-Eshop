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
    reviews: Review[] 
}

export type Review = {
    comment: string,
    date: string,
    reviewDescription: string,
    rating: Rating
}

export type Rating = {
    numOfStars: number,
    dateOfRating: string
}