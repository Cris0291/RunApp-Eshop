import axios from "axios";
import { OrderDto, OrderResponse } from "../features/payment/checkout/contracts";

axios.defaults.baseURL = "http://localhost:5253";

export async function CreateOrderRequest({orderDto, token}: {orderDto: OrderDto, token: string}){
    return axios.post<OrderResponse>("api/orders", orderDto, {
        headers:{
            "Authorization": `Bearer ${token}`
        }
    }).then(response => response.data);
}