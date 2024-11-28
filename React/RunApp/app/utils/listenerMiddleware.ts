import { createListenerMiddleware, addListener, TypedStartListening, TypedAddListener,  ListenerEffectAPI } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "./store";
import { addChangeQuantityListener } from "../features/payment/shoppingcart/cartSlice";


export const listenerMiddleware = createListenerMiddleware();

export const startAppListening = listenerMiddleware.startListening.withTypes<RootState, AppDispatch>();

export const addAppListener = addListener.withTypes<RootState, AppDispatch>();

export type AppStartListening = TypedStartListening<RootState, AppDispatch>;
export type AppAddListener = TypedAddListener<RootState, AppDispatch>;
export type AppListenerEffectAPI = ListenerEffectAPI<RootState, AppDispatch>;

addChangeQuantityListener(startAppListening);