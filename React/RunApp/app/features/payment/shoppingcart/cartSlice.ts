import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ProductForCart } from './contracts'

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
        }
    }
})

export const {addItem, deleteItem, increaseItemQuantity, decreaseItemQuantity, clearCart} = cartSlice.actions

export default cartSlice.reducer