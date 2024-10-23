import axios from "axios"
import { ProductsQuery } from "../features/store/products/contracts";


axios.defaults.baseURL = "http://localhost:5253"; 

export default function getProducts(queryValues : ProductsQuery){
    axios.get("api/products?").then(response => response.data)
}