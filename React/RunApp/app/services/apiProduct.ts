import axios from "axios"

axios.defaults.baseURL = "http://localhost:5253"; 

export default function GetProduct(query : string){
    axios.get("api/products").then(response => response.data)
}