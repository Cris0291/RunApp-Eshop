import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/registration/userSlice";
import productsQueryReducer from "../features/store/products/productsQuerySlice"
import cartReducer from "../features/payment/shoppingcart/cartSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        productsQuery: productsQueryReducer,
        cart: cartReducer,

    },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch