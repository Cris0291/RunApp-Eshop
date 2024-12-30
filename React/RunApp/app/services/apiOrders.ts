import { AxiosError } from "axios";
import { AddressResponse, AddressSettingsForm, OrderDto, OrderResponse, PaymentSettingsForm, PaymentResponse, CurrentOrderWrapper } from "../features/payment/checkout/contracts";
import { axiosInstance } from "./axiosInstance";


export async function CreateOrderRequest({orderDto, token}: {orderDto: OrderDto, token: string}){
    return axiosInstance.post<OrderResponse>("api/orders", orderDto, {
        headers:{
            "Authorization": `Bearer ${token}`
        }
    }).then(response => response.data);
}

export async function ModifyOrderAddress({orderId, addressInfo, token}: {orderId: string, addressInfo: AddressSettingsForm, token: string}){
    return axiosInstance.put<AddressResponse>(`api/orders/${orderId}/address`, addressInfo, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }).then(response => response.data)
}

export async function ModifyOrderPaymentMethod({orderId, paymentInfo, token}: {orderId: string, paymentInfo: PaymentSettingsForm, token: string}){
    return axiosInstance.put<PaymentResponse>(`api/orders/${orderId}/paymentmethod`, paymentInfo, {
        headers:{
            "Authorization": `Bearer ${token}`
        }
    }).then(response => response.data);
}

export async function PayOrder({orderId, token}: {orderId: string, token: string}){
    return axiosInstance.patch<number>(`api/orders/${orderId}/checkout`, {
        headers: {
            "Authorize": `Bearer ${token}`
        }
    }).then(response => response.status)
}

export async function GetCurrentOrder(token: string){
    return axiosInstance.get<CurrentOrderWrapper>("api/orders/current", {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }).then(response => response.data)
      .catch<AxiosError>(error => error)
}