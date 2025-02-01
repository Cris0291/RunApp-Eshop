export type Product = {
  productId: string;
  name: string;
  description: string;
  actualPrice: number;
  bulletPoints: string[];
  priceWithDiscount: number | null;
  promotionalText: string | null;
  discount: number | null;
  numberOfreviews: number | null;
  numberOflikes: number | null;
  averageRatings: number;
  reviews: Review[] | null;
  mainImage: string | null;
  categoryNames: string[];
  like: boolean;
  isBought: boolean;
  isBoughtWithReview: boolean;
};

export type Review = {
  reviewId: string;
  comment: string;
  date: string;
  reviewDescription: string;
  rating: number;
  userName: string;
};

export type Image = {
  imageId: string;
  url: string;
};

export type ReviewDto = {
  comment: string;
  reviewDescription: string;
  rating: number;
};

export type BoughtProducts = {
  boughtProducts: string[];
  boughtProductsWithReviews: string[];
};
