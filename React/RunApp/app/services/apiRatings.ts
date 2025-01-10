import { axiosInstance } from "./axiosInstance";


export default async function AddRating({rating, productId}: {rating: number, productId: string}){
   return axiosInstance.post(`api/products/${productId}/rates`, rating).then(response => response.data)
}