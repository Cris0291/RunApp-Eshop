export type UserReviews = {
    reviewId: string,
    coment: string,
    date: string,
    reviewDescription: string;
    product: ProductResponseForuserReview
}

export type ProductResponseForuserReview = {
    productId: string,
    name: string
}