import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrderDto, OrderItems, OrderResponse } from "./contracts";
import { RootState } from "@/utils/store";
import { AppStartListening } from "@//utils/listenerMiddleware";
import { CreateOrderRequest, GetCurrentOrder } from "@/services/apiOrders";
import { addCurrentItems, clearCart } from "../shoppingcart/cartSlice";
import { GetBoughtProducts } from "@/services/apiUserProfle";
import { setBoughtproducts } from "../../store/product/productSlice";
import { ProductForLineItem } from "../shoppingcart/contracts";
import Cookies from "js-cookie";

const currentOrderText = Cookies.get("Order");
const orderCookie: OrderItems | undefined = currentOrderText
  ? JSON.parse(currentOrderText)
  : undefined;

type OrderState = {
  currentOrder: OrderDto;
  currentOrderId: string;
  order_error?: string;
  IsOrder: boolean;
};

const initialState: OrderState = {
  currentOrder: {
    cardRequest: orderCookie ? orderCookie.cardRequest : null,
    addressRequest: orderCookie ? orderCookie.addressRequest : null,
  },
  currentOrderId: orderCookie ? orderCookie.orderId : "",
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

          const storedOrder: OrderItems = {
            orderId: orderWrapper.order.orderId,
            addressRequest: orderWrapper.order.addressRequest,
            cardRequest: orderWrapper.order.cardRequest,
            items: productItems,
          };
          Cookies.set("Order", JSON.stringify(storedOrder));
          listenerApi.dispatch(addCurrentItems(productItems));
        } else {
          const orderResponse = await CreateOrderRequest({
            cardRequest: null,
            addressRequest: null,
          });
          const storedOrder: OrderItems = {
            orderId: orderResponse.orderId,
            addressRequest: null,
            cardRequest: null,
            items: [],
          };
          Cookies.set("Order", JSON.stringify(storedOrder));
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

        const orderResponse = await CreateOrderRequest({
          cardRequest: null,
          addressRequest: null,
        });
        const nextOrder: OrderItems = {
          orderId: orderResponse.orderId,
          addressRequest: orderResponse.addressRequest,
          cardRequest: orderResponse.cardRequest,
          items: [],
        };

        Cookies.set("Order", JSON.stringify(nextOrder));
        listenerApi.dispatch(addOrderId(orderResponse.orderId));
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
