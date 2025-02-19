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
  numberOflikes: number | null;
  numberOfReviews: number | null;
  averageRatings: number;
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
