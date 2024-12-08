import axios from "axios";
import { AddressResponse, AddressSettingsForm, OrderDto, OrderResponse, PaymentSettingsForm, PaymentResponse } from "../features/payment/checkout/contracts";
import { headers } from "next/headers";

axios.defaults.baseURL = "http://localhost:5253";

export async function CreateOrderRequest({orderDto, token}: {orderDto: OrderDto, token: string}){
    return axios.post<OrderResponse>("api/orders", orderDto, {
        headers:{
            "Authorization": `Bearer ${token}`
        }
    }).then(response => response.data);
}

export async function ModifyOrderAddress({orderId, addressInfo, token}: {orderId: string, addressInfo: AddressSettingsForm, token: string}){
    return axios.put<AddressResponse>(`api/orders/${orderId}/address`, addressInfo, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }).then(response => response.data)
}

export async function ModifyOrderPaymentMethod({orderId, paymentInfo, token}: {orderId: string, paymentInfo: PaymentSettingsForm, token: string}){
    return axios.put<PaymentResponse>(`api/orders/${orderId}/paymentmethod`, paymentInfo, {
        headers:{
            "Authorization": `Bearer ${token}`
        }
    }).then(response => response.data);
}

export async function PayOrder({orderId, token}: {orderId: string, token: string}){
    return axios.patch<number>(`api/orders/${orderId}/checkout`, {
        headers: {
            "Authorize": `Bearer ${token}`
        }
    }).then(response => response.status)
}