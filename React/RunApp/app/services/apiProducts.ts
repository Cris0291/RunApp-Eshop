import axios from "axios"


axios.defaults.baseURL = "http://localhost:5253"; 

export default function getProducts(queryValues : string){
    console.log("in custom function")
    axios.get(`api/products?${queryValues}`).then(response => response.data)
}