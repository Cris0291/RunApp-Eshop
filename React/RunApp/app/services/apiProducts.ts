import { ProductForCard, ProductForCardWithDiscount } from "../features/store/products/contracts";
import { axiosInstance } from "./axiosInstance";



export default async  function getProducts(queryValues : string, token: string){
    return axiosInstance.get<ProductForCard[]>(`api/products?${queryValues}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }).then(response => response.data)
}

export async function getProductsWithDiscount(token: string){
    return axiosInstance.get<ProductForCardWithDiscount>("api/products/product-discount", {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }).then(response => response.data)

}