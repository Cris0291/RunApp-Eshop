import { axiosInstance } from "./axiosInstance";


export default async function AddRating({rating, productId, token}: {rating: number, productId: string, token: string}){
   return axiosInstance.post(`api/products/${productId}/rates`, rating, {
    headers: {
        "Authorization": `Bearer ${token}`
    }
   }).then(response => response.data)
}