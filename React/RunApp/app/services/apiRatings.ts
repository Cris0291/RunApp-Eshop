import axios from "axios"

axios.defaults.baseURL = "http://localhost:5253"; 

export default async function AddRating({rating, productId, token}: {rating: number, productId: string, token: string}){
   return axios.post(`api/products/${productId}/rates`, rating, {
    headers: {
        "Authorization": `Bearer ${token}`
    }
   }).then(response => response.data)
}