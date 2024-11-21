import axios from "axios"
import { Product } from "../features/store/product/contracts";
import { ProductRequestDto, ProductResponseDto } from "../features/profiles/creationcenter/contracts";
import { headers } from "next/headers";

axios.defaults.baseURL = "http://localhost:5253"; 

export async function GetProduct(query : string, token: string){
    return axios.get<Product>(`api/products/${query}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }).then(response => response.data)
}

export async function CreateProduct({product, token}: {product: ProductRequestDto, token: string}){
    return axios.post<ProductResponseDto>("api/products", product, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }).then(response => response.data)
}