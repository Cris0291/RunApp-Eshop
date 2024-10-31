import axios from "axios"
import { Product } from "../features/store/product/contracts";

axios.defaults.baseURL = "http://localhost:5253"; 

export default function GetProduct(query : string){
    return axios.get<Product>(`api/products${query}`).then(response => response.data)
}