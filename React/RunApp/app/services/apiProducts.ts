import { AxiosError } from "axios";
import { ProductForCard, ProductForCardWithDiscount } from "../features/store/products/contracts";
import { axiosInstance } from "./axiosInstance";



export default async function   GetProducts(queryValues : string){
    return axiosInstance.get<ProductForCard[]>(`api/products?${queryValues}`).then(response => response.data).catch<AxiosError>(error => error)
}

export async function getProductsWithDiscount(){
    return axiosInstance.get<ProductForCardWithDiscount>("api/products/product-discount").then(response => response.data)

}