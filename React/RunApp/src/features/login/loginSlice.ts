import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { OrderResponse } from "../payment/checkout/contracts";
import { ProductForLineItem } from "../payment/shoppingcart/contracts";
import { addOrder } from "../payment/checkout/orderSlice";
import { addCurrentItems } from "../payment/shoppingcart/cartSlice";
import { RootState } from "@/utils/store";
import { AppStartListening } from "@/utils/listenerMiddleware";
import { GetCurrentOrder } from "@/services/apiOrders";

interface loginInitialState {
  IsLoggedIn: boolean;
  orderError?: AxiosError;
}

const initialState: loginInitialState = {
  IsLoggedIn: false,
  orderError: undefined,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setLogin: (state) => {
      state.IsLoggedIn = true;
    },
    setOrderError: (state, action: PayloadAction<AxiosError>) => {
      state.orderError = action.payload;
    },
  },
});

export const { setLogin, setOrderError } = loginSlice.actions;

export default loginSlice.reducer;

export const getLoggedinConfirmation = (state: RootState) =>
  state.login.IsLoggedIn;

export const getCurrentOrderListener = (
  startAppListening: AppStartListening
) => {
  startAppListening({
    actionCreator: setLogin,
    effect: async (action, listenerApi) => {
      const state = listenerApi.getState();

      const response = await GetCurrentOrder();

      if (response instanceof AxiosError) {
        listenerApi.dispatch(setOrderError(response));
      } else {
        if (response.order !== undefined) {
          const currentOrder = response.order;

          const orderWithoutItems: OrderResponse = {
            OrderId: currentOrder.OrderId,
            CardRequest: currentOrder.CardRequest,
            AddressRequest: currentOrder.AddressRequest,
          };
          const currentItems: ProductForLineItem[] = currentOrder.Items.map(
            (item) => {
              return {
                id: item.productId,
                name: item.name,
                quantity: item.quantity,
                price: item.price,
                priceWithDiscount: item.priceWithDiscount,
                totalPrice: item.totalPrice,
              };
            }
          );

          listenerApi.dispatch(addOrder(orderWithoutItems));
          listenerApi.dispatch(addCurrentItems(currentItems));
        }
      }
    },
  });
};
