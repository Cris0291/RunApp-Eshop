import { AxiosError } from "axios";
import { AddressResponse, AddressSettingsForm, OrderDto, OrderResponse, PaymentSettingsForm, PaymentResponse, CurrentOrderWrapper } from "../features/payment/checkout/contracts";
import { axiosInstance } from "./axiosInstance";


export async function CreateOrderRequest({orderDto}: {orderDto: OrderDto}){
    return axiosInstance.post<OrderResponse>("api/orders", orderDto).then(response => response.data);
}

export async function ModifyOrderAddress({orderId, addressInfo}: {orderId: string, addressInfo: AddressSettingsForm}){
    return axiosInstance.put<AddressResponse>(`api/orders/${orderId}/address`, addressInfo).then(response => response.data)
}

export async function ModifyOrderPaymentMethod({orderId, paymentInfo}: {orderId: string, paymentInfo: PaymentSettingsForm}){
    return axiosInstance.put<PaymentResponse>(`api/orders/${orderId}/paymentmethod`, paymentInfo).then(response => response.data);
}

export async function PayOrder({orderId}: {orderId: string}){
    return axiosInstance.patch<number>(`api/orders/${orderId}/checkout`).then(response => response.status)
}

export async function GetCurrentOrder(){
    return axiosInstance.get<CurrentOrderWrapper>("api/orders/current").then(response => response.data)
      .catch<AxiosError>(error => error)
}