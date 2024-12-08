import axios from "axios"

axios.defaults.baseURL = "http://localhost:5253"; 

export default async function AddOrRemoveLike({productId, liked, token}: {productId: string, liked: boolean, token: string}){
    return axios.post<number>(`api/products/${productId}/likes/like?added=${liked}`, {
        headers:{
            "Authorization": `Bearer ${token}`
        }
    }).then(response => response.status)
}