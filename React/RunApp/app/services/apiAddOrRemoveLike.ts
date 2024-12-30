import { axiosInstance } from "./axiosInstance";
 

export default async function AddOrRemoveLike({productId, liked, token}: {productId: string, liked: boolean, token: string}){
    return axiosInstance.post<number>(`api/products/${productId}/likes/like?added=${liked}`, {
        headers:{
            "Authorization": `Bearer ${token}`
        }
    }).then(response => response.status)
}