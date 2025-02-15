import { ReviewDto, Review } from "../features/store/product/contracts";
import { axiosInstance } from "./axiosInstance";

export async function CreateReview({
  reviewDto,
  productId,
}: {
  reviewDto: ReviewDto;
  productId: string;
}) {
  return axiosInstance
    .post<Review>(`api/products/${productId}/reviews`, reviewDto)
    .then((response) => response.data);
}

export async function UpdateReview({
  reviewDto,
  productId,
}: {
  reviewDto: ReviewDto;
  productId: string;
}) {
  return axiosInstance
    .put<Review>(`api/products/${productId}/reviews`, reviewDto)
    .then((response) => response.data);
}
