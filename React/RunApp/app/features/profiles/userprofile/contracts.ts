export type UserReviews = {
    reviewId: string,
    rating: number
    comment: string,
    reviewDate: string,
    reviewDescription: string;
    productId?: string,
    productName?: string,
    productImage?: string
}

export type UserLikes = {
    productImage?: string,
    productId?: string,
    productName?: string,
    productPrice?: number,
    likeId: string,
    like?: boolean
}

export type UserBoughtProducts = {
    productId: string,
    productImage?: string,
    productPrice: number,
    name: string,
    category: string
}