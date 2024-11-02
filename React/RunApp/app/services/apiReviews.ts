import axios from "axios"
import { ReviewDto, Review } from "../features/store/product/contracts";

axios.defaults.baseURL = "http://localhost:5253"; 

export async function CreateReview(reviewDto: ReviewDto) {
    return axios.post<Review>(`api/products/${reviewDto.productId}/reviews`).then(response => response.data)
}