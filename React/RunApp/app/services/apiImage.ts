import { Image } from "../features/store/product/contracts";
import { axiosInstance } from "./axiosInstance";


export default async function uploadImageForProduct({imageFile, productId, token}: {imageFile: FormData, productId: string, token: string}){
    return axiosInstance.post<Image>(`api/products/${productId}/photos`, imageFile, {
        headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`
        }
    }).then(response => response.data)
}