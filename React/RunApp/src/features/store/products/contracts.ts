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
  priceWithDiscount: number | null;
  promotionalText: string | null;
  discount: number | null;
  numberOfLikes: number | null;
  numberOfReviews: number | null;
  averageRating: number;
  userLike: boolean | null;
  categoryNames: string[];
};

export type ProductForCardWithDiscount = {
  productId: string;
  productName: string;
  image: string | null;
  price: number;
  discount: number | null;
  priceWithDiscount: number | null;
  size: string;
};
