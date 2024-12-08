import axios from "axios"
import { ProductForCard, ProductForCardWithDiscount } from "../features/store/products/contracts";


axios.defaults.baseURL = "http://localhost:5253"; 

export default async  function getProducts(queryValues : string, token: string){
    return axios.get<ProductForCard>(`api/products?${queryValues}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }).then(response => response.data)
}

export async function getProductsWithDiscount(token: string){
    return axios.get<ProductForCardWithDiscount>("", {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }).then(response => response.data)

}