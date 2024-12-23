import { createSlice, isAnyOf } from '@reduxjs/toolkit'
import type { Action, PayloadAction } from '@reduxjs/toolkit'
import { ProductForCart } from './contracts'
import { RootState } from '@/app/utils/store'
import { AppListenerEffectAPI, AppStartListening, startAppListening } from '@/app/utils/listenerMiddleware'
import { addItemToCart, deleteItemToCart, updateItemQuantity } from '@/app/services/apiCart'
import { ExistProduct } from '@/app/services/apiProduct'

type cartState = {
    products: ProductForCart[],
    currentProducId: string,
    pendingProductIfOrderDoesNotExist?: ProductForCart,
}

const initialState : cartState = {
    products: [
        { id: "1", name: "Wireless earbuds", quantity: 3, price: 79.99, priceWithDiscount: 20, totalPrice: 20, image: "/placeholder.svg?height=200&width=200" },
        { id: "2", name: "Smart watch", quantity: 2,  price: 199.99, priceWithDiscount: 20, totalPrice: 20, image: "/placeholder.svg?height=200&width=200" },
        { id: "3", name: "Bluetooth speaker", quantity: 1, price: 59.99, priceWithDiscount: 20, totalPrice: 20, image: "/placeholder.svg?height=200&width=200" },
      ],
      currentProducId: "",
      pendingProductIfOrderDoesNotExist: undefined
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<ProductForCart>) => {
            state.currentProducId = action.payload.id;
            state.products.push(action.payload)
        },
        deleteItem: (state, action: PayloadAction<string>) => {
            state.currentProducId = action.payload;
            state.products = state.products.filter(x => x.id !== action.payload)
        },
        increaseItemQuantity: (state, action: PayloadAction<string>) => {
            const product = state.products.find(x => x.id === action.payload)
            if(product == undefined) throw new Error("Cart item was not found");
            if(product.quantity === null) throw new Error("Quantity should not be undefined");

            state.currentProducId = product.id;
            product.quantity += 1
        
            product.totalPrice = product.quantity * (product.priceWithDiscount === undefined ? product.price : product.priceWithDiscount)
        },
        decreaseItemQuantity: (state, action: PayloadAction<string>) => {
            const product = state.products.find(x => x.id === action.payload)
            if(product == undefined) throw new Error("Cart item was not found");
            if(product.quantity === null) throw new Error("Quantity should not be undefined");
            
            state.currentProducId = product.id;
            product.quantity -= 1;

            product.totalPrice = product.quantity * (product.priceWithDiscount === undefined ? product.price : product.priceWithDiscount)

            if(product.quantity <= 0) {
                product.quantity = 1;
                product.totalPrice = product.quantity * (product.priceWithDiscount === undefined ? product.price : product.priceWithDiscount)
            }
        },
        changeItemQuantity: (state, action: PayloadAction<{productId: string, newQuantity: number}>) => {
            const product = state.products.find(x => x.id === action.payload.productId);
            if(product == undefined) throw new Error("Cart item was not found");

            state.currentProducId = product.id;

            product.quantity = action.payload.newQuantity;
            product.totalPrice = product.quantity * (product.priceWithDiscount === undefined ? product.price : product.priceWithDiscount);

            if(action.payload.newQuantity <= 0) {
                product.quantity = 1;
                product.totalPrice = product.quantity * (product.priceWithDiscount === undefined ? product.price : product.priceWithDiscount)
            }

            if(Number.isNaN(action.payload.newQuantity)) product.quantity = null;
        },
        addPendingProduct: (state, action: PayloadAction<ProductForCart>) => {
            state.pendingProductIfOrderDoesNotExist = action.payload;
        },
        deletePendingProduct: (state) => {
            state.pendingProductIfOrderDoesNotExist = undefined;
        }
    }
})

export const {addItem, deleteItem, increaseItemQuantity, decreaseItemQuantity, changeItemQuantity, addPendingProduct, deletePendingProduct} = cartSlice.actions

export default cartSlice.reducer;

export const getTotalPrice = (state: RootState) => state.cart.products.reduce((sum, item) => {
    const priceToReduce =(item.priceWithDiscount === undefined ? item.price : item.priceWithDiscount);
    const quantityPeritem = item.quantity === null ? 0 : item.quantity;
    return sum + (priceToReduce * quantityPeritem);
} ,0)

export const getTotalItems = (state: RootState) => state.cart.products.reduce((sum, item) => {
    if(item.quantity === null) return (sum + 0);

    return (sum + item.quantity);
},0);

export const getCartItems = (state: RootState) => state.cart.products;

export const addChangeQuantityListener = (startAppListening: AppStartListening) => {
    startAppListening({
        matcher: isAnyOf(increaseItemQuantity, decreaseItemQuantity , changeItemQuantity),
        effect: async (action, listenerApi) => {
            listenerApi.cancelActiveListeners();

            await listenerApi.delay(500);

            const state = listenerApi.getState();
            const token = state.user.token;
            const cartState = state.cart;
            const orderState = state.order;

            const product = cartState.products.find(x => x.id === cartState.currentProducId);
            if(product == undefined) throw new Error("Cart item was not found");
            if(orderState.currentOrderId.trim().length === 0) throw new Error("Something unexpected happened, order was not added");
            
            if(product.quantity !== null) await updateItemQuantity({orderId: orderState.currentOrderId, productId: cartState.currentProducId, quantity: product.quantity, token});
        }
    });
}

export const addItemListener = (startAppListening: AppStartListening) => {
    startAppListening({
        actionCreator: addItem,
        effect: async (action, listenerApi) => {
            const state = listenerApi.getState();
            const token = state.user.token;
            const cartState = state.cart;
            const orderState = state.order;

            const product = cartState.products.find(x => x.id === cartState.currentProducId);
            if(product == undefined) throw new Error("Cart item was not found");

            const result = await ExistProduct({productId: cartState.currentProducId, token});

            if(orderState.currentOrderId.trim().length === 0) throw new Error("Something unexpected happened, order was not added");

            if(result == 200) await addItemToCart({productForCart: product, orderId: orderState.currentOrderId, token});
        }
    });
}

export const deleteItemListener = (startAppListening: AppStartListening) => {
    startAppListening({
        actionCreator: deleteItem,
        effect: async (action, listenerApi) => {
            const state = listenerApi.getState();
            const token = state.user.token;
            const cartState = state.cart;
            const orderState = state.order;

            const result = await ExistProduct({productId: cartState.currentProducId, token});

            if(orderState.currentOrderId.trim().length === 0) throw new Error("Something unexpected happened, order was not added");

            if(result == 200) await deleteItemToCart({token, orderId: orderState.currentOrderId, DeleteItemDto: {ProductId: cartState.currentProducId}})
        }
    });
}