import { axiosInstance } from "./axiosInstance";
 

export default async function AddOrRemoveLike({productId, liked}: {productId: string, liked: boolean}){
    return axiosInstance.post<number>(`api/products/${productId}/likes/like?added=${liked}`).then(response => response.status)
}