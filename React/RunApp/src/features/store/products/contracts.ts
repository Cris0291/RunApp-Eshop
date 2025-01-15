export type ProductsQuery = {
  sortBy: string;
  search: string;
  categories: string[];
  priceRange: number[];
  starFilters: number[];
};

export type ProductForCard = {
  productId: string;
  name: string;
  mainImage?: string;
  actualPrice: number;
  priceWithDiscount: number | undefined;
  promotionalText: string | undefined;
  discount: number | undefined;
  numberOfLikes: number | undefined;
  numberOfReviews: number | undefined;
  averageRating: number;
  userLike: boolean;
  categoryNames: string[];
};

export type ProductForCardWithDiscount = {
  productId: string;
  productName: string;
  image?: string;
  price: number;
  discount?: number;
  priceWithDiscount: number | undefined;
  size: string;
};
