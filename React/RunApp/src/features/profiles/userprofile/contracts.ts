export type UserReviews = {
  reviewId: string;
  rating: number;
  comment: string;
  reviewDate: string;
  reviewDescription: string;
  productId: string;
  productName: string;
};

export type UserLikes = {
  productId: string;
  productName: string;
  productPrice: number;
  likeId: string;
  like?: boolean;
};

export type UserBoughtProducts = {
  productId: string;
  productPrice: number;
  name: string;
  category: string;
};

export type SimpleBoughtProducts = {
  boughtProducts: string[];
  boughtProductsWithReview: string[];
};
