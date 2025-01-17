import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AddressSettingsForm,
  OrderDto,
  OrderResponse,
  PaymentSettingsForm,
} from "./contracts";
import { RootState } from "@/utils/store";
import { AppStartListening } from "@//utils/listenerMiddleware";
import { CreateOrderRequest } from "@/services/apiOrders";
import { clearCart, deletePendingProduct } from "../shoppingcart/cartSlice";
import { GetBoughtProducts } from "@/services/apiUserProfle";
import { setBoughtproducts } from "../../store/product/productSlice";
import { ExistProduct } from "@/services/apiProduct";
import { addItemToCart } from "@/services/apiCart";

type OrderState = {
  currentOrder: OrderDto;
  currentOrderId: string;
  order_error?: string;
  IsOrder: boolean;
};

const initialState: OrderState = {
  currentOrder: {},
  currentOrderId: "",
  order_error: undefined,
  IsOrder: false,
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    createOrder: (
      state,
      action: PayloadAction<{
        address?: AddressSettingsForm;
        card?: PaymentSettingsForm;
      }>
    ) => {
      state.currentOrder.AddressRequest = action.payload.address;
      state.currentOrder.CardRequest = action.payload.card;
    },
    addOrderId: (state, action: PayloadAction<string>) => {
      state.currentOrderId = action.payload;
    },
    payCurrentOrder: (state) => {
      state.currentOrder = {};
      state.currentOrderId = "";
    },
    addError: (state, action: PayloadAction<string | undefined>) => {
      state.order_error = action.payload;
    },
    CheckOrderExistence: (state, action: PayloadAction<boolean>) => {
      state.IsOrder = action.payload;
    },
    addOrder: (state, action: PayloadAction<OrderResponse>) => {
      state.currentOrder.AddressRequest = action.payload.AddressRequest;
      state.currentOrder.CardRequest = action.payload.CardRequest;
    },
  },
});

export const {
  createOrder,
  addOrderId,
  payCurrentOrder,
  addError,
  CheckOrderExistence,
  addOrder,
} = orderSlice.actions;

export default orderSlice.reducer;

export const getIsCurrentOrder = (state: RootState) => state.order.IsOrder;
export const getCurrentOrderId = (state: RootState) =>
  state.order.currentOrderId;
export const getOrderError = (state: RootState) => state.order.order_error;

export const createOrderListener = (startAppListening: AppStartListening) => {
  startAppListening({
    actionCreator: createOrder,
    effect: async (action, listenerApi) => {
      const state = listenerApi.getState();

      try {
        if (state.cart.pendingProductIfOrderDoesNotExist === undefined)
          throw new Error(
            "Something unexpected happened. the item you are trying to add to the cart was not found"
          );

        const orderResponse = await CreateOrderRequest({
          orderDto: state.order.currentOrder,
        });

        if (orderResponse) listenerApi.dispatch(CheckOrderExistence(true));

        const result = await ExistProduct({
          productId: state.cart.pendingProductIfOrderDoesNotExist.id,
        });

        if (result !== 200)
          throw new Error(
            "Testing. Requested item was not find in the database"
          );

        await addItemToCart({
          productForCart: state.cart.pendingProductIfOrderDoesNotExist,
          orderId: orderResponse.OrderId,
        });

        listenerApi.dispatch(deletePendingProduct());
      } catch (error) {
        listenerApi.dispatch(CheckOrderExistence(false));
        listenerApi.dispatch(
          addError("There was a problem with the current order")
        );
      }
    },
  });
};

export const payOrderListener = (startAppListening: AppStartListening) => {
  startAppListening({
    actionCreator: payCurrentOrder,
    effect: async (action, listenerApi) => {
      const state = listenerApi.getState();

      try {
        const boughtProducts = await GetBoughtProducts();
        listenerApi.dispatch(setBoughtproducts(boughtProducts));

        listenerApi.dispatch(clearCart());
      } catch (error) {
        listenerApi.dispatch(
          addError(
            "There was a problem checking which products have been bought"
          )
        );
      }
    },
  });
};
