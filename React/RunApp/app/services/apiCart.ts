import axios from "axios";
import { CartProductsResponse, ChangeItemQuantityRequestDto, DeleteItemDto, ProductForCart } from "../features/payment/shoppingcart/contracts";

axios.defaults.baseURL = "http://localhost:5253";

export async function updateItemQuantity({orderId, productId, quantity, token}: {orderId: string, productId: string, quantity: number, token: string}){
    const changeQuantityDto: ChangeItemQuantityRequestDto = {productId, quantity};
    
    return axios.put(`api/oorders${orderId}/lineitems`, changeQuantityDto, {
        headers:{
            "Authorization": `Bearer ${token}`
        }
    }).then(response => response.status);
}

export async function addItemToCart({productForCart, orderId, token}: {productForCart: ProductForCart, orderId: string, token: string}){
    return axios.post<CartProductsResponse>(`api/orders/${orderId}/lineitems`, productForCart, {
        headers:{
            "Authorization": `Bearer ${token}`
        }
    }).then(response => response.data);
}

export async function deleteItemToCart({token, orderId, DeleteItemDto}: {token: string, orderId: string, DeleteItemDto: DeleteItemDto}){
    return axios.delete(`api/orders/${orderId}/lineitems`, {
        headers: {
            "Authorization": `Bearer ${token}`
        },
        data: {
            DeleteItemDto: DeleteItemDto
        }
    }).then(response => response.status)
}