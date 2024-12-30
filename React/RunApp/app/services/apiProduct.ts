import { CategoryResponse, newCategoryDto, newPromotionDto, ProductCreated, ProductRequestDto, ProductResponseDto } from "../features/profiles/creationcenter/contracts";
import { Product } from "../features/store/product/contracts";
import { axiosInstance } from "./axiosInstance";



export async function GetProduct(query : string, token: string){
    return axiosInstance.get<Product>(`api/products/${query}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }).then(response => response.data)
}

export async function CreateProduct({product, token}: {product: ProductRequestDto, token: string}){
    return axiosInstance.post<ProductResponseDto>("api/products", product, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }).then(response => response.data)
}

export async function AddNewDiscount({newDiscount, productId, token}: {newDiscount: newPromotionDto, productId: string, token: string}){
    return axiosInstance.post<number>(`api/products/${productId}/discounts`, newDiscount, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }).then(response => response.status);
}

export async function DeleteNewDiscount({productId, token}: {productId: string, token: string}){
    return axiosInstance.delete<number>(`api/products/${productId}/discounts`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }).then(response => response.status)
}

export async function AddNewCategory({newCategory, productId, token}: {newCategory: newCategoryDto, productId: string, token: string}){
    return axiosInstance.post<CategoryResponse>(`api/products/${productId}/categories`, newCategory, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }).then(response => response.data);
}

export async function DeleteProduct({productId, token}: {productId: string, token: string}){
    return axiosInstance.delete<number>(`api/products/${productId}`,{
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }).then(response => response.status);
}

export async function GetCreatedProducts(token: string){
    return axiosInstance.get<ProductCreated[]>(`api/user/created-products`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }).then(response => response.data);
}

export async function ExistProduct({productId, token}: {productId: string, token: string}){
    return axiosInstance.get<number>(`api/products/${productId}/exist`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }).then(response => response.status)
}