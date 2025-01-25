import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrderDto, OrderResponse } from "./contracts";
import { RootState } from "@/utils/store";
import { AppStartListening } from "@//utils/listenerMiddleware";
import { CreateOrderRequest, GetCurrentOrder } from "@/services/apiOrders";
import { addCurrentItems, clearCart } from "../shoppingcart/cartSlice";
import { GetBoughtProducts } from "@/services/apiUserProfle";
import { setBoughtproducts } from "../../store/product/productSlice";
import { ProductForLineItem } from "../shoppingcart/contracts";

type OrderState = {
  currentOrder: OrderDto;
  currentOrderId: string;
  order_error?: string;
  IsOrder: boolean;
};

const initialState: OrderState = {
  currentOrder: { cardRequest: null, addressRequest: null },
  currentOrderId: "",
  order_error: undefined,
  IsOrder: false,
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    createOrder: (state) => {
      state.IsOrder = true;
    },
    payCurrentOrder: (state) => {
      state.currentOrder = { cardRequest: null, addressRequest: null };
      state.currentOrderId = "";
    },
    addError: (state, action: PayloadAction<string | undefined>) => {
      state.order_error = action.payload;
    },
    addOrder: (state, action: PayloadAction<OrderResponse>) => {
      state.currentOrder.addressRequest = action.payload.addressRequest;
      state.currentOrder.cardRequest = action.payload.cardRequest;
      state.currentOrderId = action.payload.orderId;
    },
    addOrderId: (state, action: PayloadAction<string>) => {
      state.currentOrderId = action.payload;
    },
  },
});

export const { createOrder, payCurrentOrder, addError, addOrder, addOrderId } =
  orderSlice.actions;

export default orderSlice.reducer;

export const getIsCurrentOrder = (state: RootState) =>
  state.order.currentOrderId.trim().length > 0;
export const getCurrentOrderId = (state: RootState) =>
  state.order.currentOrderId;
export const getOrderError = (state: RootState) => state.order.order_error;

export const createOrderListener = (startAppListening: AppStartListening) => {
  startAppListening({
    actionCreator: createOrder,
    effect: async (action, listenerApi) => {
      const state = listenerApi.getState();

      try {
        const orderWrapper = await GetCurrentOrder();

        if (orderWrapper.order !== null) {
          listenerApi.dispatch(
            addOrder({
              orderId: orderWrapper.order.orderId,
              addressRequest: orderWrapper.order.addressRequest,
              cardRequest: orderWrapper.order.cardRequest,
            })
          );
          const productItems: ProductForLineItem[] =
            orderWrapper.order.items.length > 0
              ? orderWrapper.order.items.map((item) => ({
                  id: item.productId,
                  name: item.name,
                  price: item.price,
                  quantity: item.quantity,
                  totalPrice: item.totalPrice,
                  priceWithDiscount: item.priceWithDiscount,
                }))
              : [];

          listenerApi.dispatch(addCurrentItems(productItems));
        } else {
          const orderResponse = await CreateOrderRequest({
            cardRequest: null,
            addressRequest: null,
          });
          listenerApi.dispatch(addOrder(orderResponse));
        }
      } catch (error) {
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
