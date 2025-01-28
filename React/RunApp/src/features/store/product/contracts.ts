export type Product = {
  productId: string;
  name: string;
  description: string;
  actualPrice: number;
  bulletPoints: string[];
  priceWithDiscount: number | undefined;
  promotionalText: string | undefined;
  discount: number | undefined;
  numberOfreviews: number | undefined;
  numberOflikes: number | undefined;
  averageRatings: number;
  reviews: Review[] | null;
  mainImage?: string;
  categoryNames: string[];
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
