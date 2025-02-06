import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/registration/userSlice";
import productsQueryReducer from "../features/store/products/productsQuerySlice";
import cartReducer from "../features/payment/shoppingcart/cartSlice";
import { listenerMiddleware } from "./listenerMiddleware";
import orderReducer from "../features/payment/checkout/orderSlice";
import loginReducer from "../features/login/loginSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    productsQuery: productsQueryReducer,
    cart: cartReducer,
    order: orderReducer,
    login: loginReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
