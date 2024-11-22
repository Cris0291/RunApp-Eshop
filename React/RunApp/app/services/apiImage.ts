import axios from "axios"
import { Image } from "../features/store/product/contracts";

axios.defaults.baseURL = "http://localhost:5253";

export default async function uploadImageForProduct({imageFile, productId, token}: {imageFile: FormData, productId: string, token: string}){
    return axios.post<Image>(`api/products/${productId}/photos`, imageFile, {
        headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`
        }
    }).then(response => response.data)
}