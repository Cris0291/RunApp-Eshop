export type ProductsQuery = {
    sortBy: string,
    search: string,
    categories: string[]
    priceRange: number[],
    starFilters: number[],
}

export type ProductForCard = {
    productId: string,
    productName: string,
    mainImage: string,
    price: number,
    priceWithDiscount: number | undefined,
    numberOfLikes: number,
    category: string[],
    numberOfStars: number,
}


export type ProductForCardWithDiscountt = {
    productId: string,
    productName: string,
    mainImage: string,
    price: number,
    priceWithDiscount: number | undefined,
}