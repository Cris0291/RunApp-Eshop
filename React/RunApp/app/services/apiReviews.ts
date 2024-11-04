import axios from "axios"
import { ReviewDto, Review } from "../features/store/product/contracts";

axios.defaults.baseURL = "http://localhost:5253"; 

export async function CreateReview({reviewDto, productId, token}: {reviewDto: ReviewDto, productId: string, token: string}) {
    return axios.post<Review>(`api/products/${productId}/reviews`, reviewDto, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }).then(response => response.data)
}