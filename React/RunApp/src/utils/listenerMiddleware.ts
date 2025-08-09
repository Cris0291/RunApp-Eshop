import {
  createListenerMiddleware,
  addListener,
  TypedStartListening,
  TypedAddListener,
  ListenerEffectAPI,
} from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "./store";
import {
  addChangeQuantityListener,
  addItemListener,
  addItemsDueToDeletionListener,
  deleteItemListener,
} from "../features/payment/shoppingcart/cartSlice";
import {
  addressOrderListener,
  createOrderListener,
  paymentOrderListener,
  payOrderListener,
} from "../features/payment/checkout/orderSlice";
import { getCurrentOrderListener } from "../features/login/loginSlice";
import {
  addressUserListener,
  paymentUserListener,
} from "@/features/registration/userSlice";

export const listenerMiddleware = createListenerMiddleware();

export const startAppListening = listenerMiddleware.startListening.withTypes<
  RootState,
  AppDispatch
>();

export const addAppListener = addListener.withTypes<RootState, AppDispatch>();

export type AppStartListening = TypedStartListening<RootState, AppDispatch>;
export type AppAddListener = TypedAddListener<RootState, AppDispatch>;
export type AppListenerEffectAPI = ListenerEffectAPI<RootState, AppDispatch>;

addChangeQuantityListener(startAppListening);
addItemListener(startAppListening);
deleteItemListener(startAppListening);
createOrderListener(startAppListening);
payOrderListener(startAppListening);
getCurrentOrderListener(startAppListening);
addressOrderListener(startAppListening);
paymentOrderListener(startAppListening);
addressUserListener(startAppListening);
paymentUserListener(startAppListening);
addItemsDueToDeletionListener(startAppListening);
