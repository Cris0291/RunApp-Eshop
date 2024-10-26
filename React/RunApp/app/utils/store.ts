import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/registration/userSlice";
import productsQueryReducer from "../features/store/products/productsQuerySlice"

export const store = configureStore({
    reducer: {
        user: userReducer,
        productsQuery: productsQueryReducer

    },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch