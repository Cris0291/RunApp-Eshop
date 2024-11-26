import axios from "axios"
import { Product } from "../features/store/product/contracts";
import { CategoryResponse, newCategoryDto, newPromotionDto, ProductRequestDto, ProductResponseDto } from "../features/profiles/creationcenter/contracts";
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

export async function AddNewDiscount({newDiscount, productId, token}: {newDiscount: newPromotionDto, productId: string, token: string}){
    return axios.post<ProductResponseDto>(`api/products/${productId}/discounts`, newDiscount, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }).then(response => response.data);
}

export async function AddNewCategory({newCategory, productId, token}: {newCategory: newCategoryDto, productId: string, token: string}){
    return axios.post<CategoryResponse>(`api/products/${productId}/categories`, newCategory, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }).then(response => response.data);
}

export async function DeleteProduct({productId, token}: {productId: string, token: string}){
    return axios.delete(`api/products/${productId}`,{
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }).then(response => response.status);
}

export async function GetCreatedProducts(token: string){
    return axios.get<ProductResponseDto[]>(`api/user/created-products`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }).then(response => response.data);
}