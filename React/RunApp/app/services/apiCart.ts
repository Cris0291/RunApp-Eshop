import { CartProductsResponse, ChangeItemQuantityRequestDto, DeleteItemDto, ProductForLineItem } from "../features/payment/shoppingcart/contracts";
import { axiosInstance } from "./axiosInstance";


export async function updateItemQuantity({orderId, productId, quantity}: {orderId: string, productId: string, quantity: number}){
    const changeQuantityDto: ChangeItemQuantityRequestDto = {productId, quantity};
    
    return axiosInstance.put<number>(`api/orders/${orderId}/lineitems`, changeQuantityDto).then(response => response.status);
}

export async function addItemToCart({productForCart, orderId}: {productForCart: ProductForLineItem, orderId: string}){
    return axiosInstance.post<CartProductsResponse>(`api/orders/${orderId}/lineitems`, productForCart).then(response => response.data);
}

export async function deleteItemToCart({orderId, DeleteItemDto}: {orderId: string, DeleteItemDto: DeleteItemDto}){
    return axiosInstance.delete<number>(`api/orders/${orderId}/lineitems`, {
        data: {
            DeleteItemDto: DeleteItemDto
        }
    }).then(response => response.status)
}