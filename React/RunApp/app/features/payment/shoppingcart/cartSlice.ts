import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ProductForCart } from './contracts'
import { RootState } from '@/app/utils/store'

type cartState = {
    products: ProductForCart[],
}

const initialState : cartState = {
    products: []
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<ProductForCart>) => {
            state.products.push(action.payload)
        },
        deleteItem: (state, action: PayloadAction<string>) => {
            state.products = state.products.filter(x => x.id !== action.payload)
        },
        increaseItemQuantity: (state, action: PayloadAction<string>) => {
            const product = state.products.find(x => x.id === action.payload)
            if(product == undefined) throw new Error("Cart item was not found")
            product.quantity += 1
        
            product.totalPrice = product.quantity * (product.priceWithDiscount === undefined ? product.price : product.priceWithDiscount)
        },
        decreaseItemQuantity: (state, action: PayloadAction<string>) => {
            const product = state.products.find(x => x.id === action.payload)
            if(product == undefined) throw new Error("Cart item was not found")
            
            product.quantity -= 1
            product.totalPrice = product.quantity * (product.priceWithDiscount === undefined ? product.price : product.priceWithDiscount)

            if(product.quantity <= 0) cartSlice.caseReducers.deleteItem(state, action)
        },
        clearCart: (state) => {
            state.products = []
        },
        changeItemQuantity: (state, action: PayloadAction<{productId: string, newQuantity: number}>) => {
            const product = state.products.find(x => x.id === action.payload.productId);
            if(product == undefined) throw new Error("Cart item was not found");

            if(action.payload.newQuantity <= 0) cartSlice.caseReducers.deleteItem(state, {payload: action.payload.productId, type: action.type});

            product.quantity = action.payload.newQuantity;
            product.totalPrice = product.quantity * (product.priceWithDiscount === undefined ? product.price : product.priceWithDiscount);
        }
    }
})

export const {addItem, deleteItem, increaseItemQuantity, decreaseItemQuantity, clearCart, changeItemQuantity} = cartSlice.actions

export default cartSlice.reducer;

export const getTotalPrice = (state: RootState) => state.cart.products.reduce((sum, item) => {
    const priceToReduce =(item.priceWithDiscount === undefined ? item.price : item.priceWithDiscount);
    return sum + priceToReduce;
} ,0)

export const getTotalItems = (state: RootState) => state.cart.products.reduce((sum, item) => sum + item.quantity, 0)