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

export async function UpdateReview({reviewDto, reviewId, token}: {reviewDto: ReviewDto, reviewId: string, token: string}){
    return axios.put<Review>(`api/products/${reviewId}/reviews`, reviewDto, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }).then(response => response.data)

} 