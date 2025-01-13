import { createSlice, isAnyOf } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ProductForLineItem } from './contracts'
import { RootState } from '@/app/utils/store'
import { AppStartListening} from '@/app/utils/listenerMiddleware'
import { addItemToCart, deleteItemToCart, updateItemQuantity } from '@/app/services/apiCart'
import { ExistProduct } from '@/app/services/apiProduct'
import Cookies from 'js-cookie';
import { TokenModel } from '../../registration/contracts'

type cartState = {
    products: ProductForLineItem[],
    currentProducId: string,
    pendingProductIfOrderDoesNotExist?: ProductForLineItem,
    cart_error?: string
}

const initialState : cartState = {
    products: [
      ],
      currentProducId: "",
      pendingProductIfOrderDoesNotExist: undefined,
      cart_error: undefined
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<ProductForLineItem>) => {
            state.currentProducId = action.payload.id;
            state.products.push(action.payload)
        },
        deleteItem: (state, action: PayloadAction<string>) => {
            state.currentProducId = action.payload;
            state.products = state.products.filter(x => x.id !== action.payload)
        },
        increaseItemQuantity: (state, action: PayloadAction<string>) => {
            try {
              const product = state.products.find(x => x.id === action.payload)
              if(product == undefined) throw new Error("Cart item was not found");
              if(product.quantity === null) throw new Error("Quantity should not be undefined");

              state.currentProducId = product.id;
              product.quantity += 1
        
              product.totalPrice = product.quantity * (product.priceWithDiscount === undefined ? product.price : product.priceWithDiscount)
            } catch (error) {
                state.cart_error = "There was a problem with the item selected and the quantity you are trying to increase"
            }
        },
        decreaseItemQuantity: (state, action: PayloadAction<string>) => {
            try {
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
            } catch (error) {
                state.cart_error = "There was a problem with the item selected and the quantity you are trying to decrease"
            }
        },
        changeItemQuantity: (state, action: PayloadAction<{productId: string, newQuantity: number}>) => {
            try {
            const product = state.products.find(x => x.id === action.payload.productId);
            if(product == undefined) throw new Error("Cart item was not found");

            state.currentProducId = product.id;

            product.quantity = action.payload.newQuantity;
            product.totalPrice = product.quantity * (product.priceWithDiscount === undefined ? product.price : product.priceWithDiscount);

            if(action.payload.newQuantity <= 0) {
                product.quantity = 1;
                product.totalPrice = product.quantity * (product.priceWithDiscount === undefined ? product.price : product.priceWithDiscount)
            }

            if(Number.isNaN(action.payload.newQuantity)) {
                product.quantity = null;
                product.totalPrice = 0;
            }
            } catch (error) {
                state.cart_error = "There was a problem with the item selected and the quantity you are trying to change"
            }
        },
        addPendingProduct: (state, action: PayloadAction<ProductForLineItem>) => {
            state.pendingProductIfOrderDoesNotExist = action.payload;
        },
        deletePendingProduct: (state) => {
            state.pendingProductIfOrderDoesNotExist = undefined;
        },
        clearCart: (state) => {
            state.products = [];
            state.currentProducId = "";
            state.pendingProductIfOrderDoesNotExist = undefined;
        },
        addCartError: (state,action: PayloadAction<string | undefined>) => {
            state.cart_error = action.payload
        },
        addCurrentItems: (state, action: PayloadAction<ProductForLineItem[]>) => {
            state.products = [...action.payload];
        },
    }
})

export const {addItem, deleteItem, increaseItemQuantity, decreaseItemQuantity, changeItemQuantity, addPendingProduct, deletePendingProduct, clearCart, addCartError, addCurrentItems} = cartSlice.actions

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
export const getCartError = (state: RootState) => state.cart.cart_error

export const addChangeQuantityListener = (startAppListening: AppStartListening) => {
    startAppListening({
        matcher: isAnyOf(increaseItemQuantity, decreaseItemQuantity , changeItemQuantity),
        effect: async (action, listenerApi) => {
            try {
            listenerApi.cancelActiveListeners();

            await listenerApi.delay(500);

            const state = listenerApi.getState(); 
            
            const cartState = state.cart;
            const orderState = state.order;

            const product = cartState.products.find(x => x.id === cartState.currentProducId);
            if(product == undefined) throw new Error("Cart item was not found");
            if(orderState.currentOrderId.trim().length === 0) throw new Error("Something unexpected happened, order was not added");

            const result = await ExistProduct({productId: cartState.currentProducId});
            if(result !== 200) throw new Error("Testing. Requested item was not find in the database");
            
            if(product.quantity !== null) await updateItemQuantity({orderId: orderState.currentOrderId, productId: cartState.currentProducId, quantity: product.quantity});
            } catch (error) {
                listenerApi.dispatch(addCartError("There was error while permorming an action on the new quantity"))
            }
        }
    });
}

export const addItemListener = (startAppListening: AppStartListening) => {
    startAppListening({
        actionCreator: addItem,
        effect: async (action, listenerApi) => {
            try {
            const state = listenerApi.getState();
    
            const cartState = state.cart;
            const orderState = state.order;

            const product = cartState.products.find(x => x.id === cartState.currentProducId);
            if(product == undefined) throw new Error("Cart item was not found");

            const result = await ExistProduct({productId: cartState.currentProducId});
            if(result !== 200) throw new Error("Testing. Requested item was not find in the database");

            if(orderState.currentOrderId.trim().length === 0) throw new Error("Something unexpected happened, order was not added");

            await addItemToCart({productForCart: product, orderId: orderState.currentOrderId});
            } catch (error) {
                listenerApi.dispatch(addCartError("There was error while permorming an action on the new item"))
            }
        }
    });
}

export const deleteItemListener = (startAppListening: AppStartListening) => {
    startAppListening({
        actionCreator: deleteItem,
        effect: async (action, listenerApi) => {
            try {
            const state = listenerApi.getState();
            
            const cartState = state.cart;
            const orderState = state.order;

            const result = await ExistProduct({productId: cartState.currentProducId});
            if(result !== 200) throw new Error("Testing. Requested item was not find in the database");

            if(orderState.currentOrderId.trim().length === 0) throw new Error("Something unexpected happened, order was not added");

             await deleteItemToCart({orderId: orderState.currentOrderId, DeleteItemDto: {ProductId: cartState.currentProducId}})
            } catch (error) {
                listenerApi.dispatch(addCartError("There was error while permorming an action on the deleted item"))
            }
        }
    });
}