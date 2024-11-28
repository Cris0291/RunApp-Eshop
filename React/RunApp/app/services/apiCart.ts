import axios from "axios";
import { ProductForCard } from "../features/store/products/contracts";

axios.defaults.baseURL = "http://localhost:5253";

export async function updateItemQuantity({productId, quantity, token}: {productId: string, quantity: number, token: string}){
    return axios.put(`api/oorders${productId}/lineitems`, quantity, {
        headers:{
            "Authorization": `Bearer ${token}`
        }
    }).then(response => response.status);
}