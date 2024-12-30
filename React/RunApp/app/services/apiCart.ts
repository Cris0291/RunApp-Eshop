import { CartProductsResponse, ChangeItemQuantityRequestDto, DeleteItemDto, ProductForLineItem } from "../features/payment/shoppingcart/contracts";
import { axiosInstance } from "./axiosInstance";


export async function updateItemQuantity({orderId, productId, quantity, token}: {orderId: string, productId: string, quantity: number, token: string}){
    const changeQuantityDto: ChangeItemQuantityRequestDto = {productId, quantity};
    
    return axiosInstance.put<number>(`api/orders/${orderId}/lineitems`, changeQuantityDto, {
        headers:{
            "Authorization": `Bearer ${token}`
        }
    }).then(response => response.status);
}

export async function addItemToCart({productForCart, orderId, token}: {productForCart: ProductForLineItem, orderId: string, token: string}){
    return axiosInstance.post<CartProductsResponse>(`api/orders/${orderId}/lineitems`, productForCart, {
        headers:{
            "Authorization": `Bearer ${token}`
        }
    }).then(response => response.data);
}

export async function deleteItemToCart({token, orderId, DeleteItemDto}: {token: string, orderId: string, DeleteItemDto: DeleteItemDto}){
    return axiosInstance.delete<number>(`api/orders/${orderId}/lineitems`, {
        headers: {
            "Authorization": `Bearer ${token}`
        },
        data: {
            DeleteItemDto: DeleteItemDto
        }
    }).then(response => response.status)
}