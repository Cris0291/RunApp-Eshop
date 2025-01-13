import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AddressSettingsForm, OrderDto, OrderResponse, PaymentSettingsForm } from "./contracts"
import { RootState } from "@/app/utils/store"
import { AppStartListening } from "@/app/utils/listenerMiddleware"
import { CreateOrderRequest } from "@/app/services/apiOrders"
import { addItem, clearCart, deletePendingProduct } from "../shoppingcart/cartSlice"
import { GetBoughtProducts } from "@/app/services/apiUserProfle"
import { setBoughtproducts } from "../../store/product/productSlice"

type OrderState = {
    currentOrder: OrderDto,
    currentOrderId: string,
    order_error?: string
}

const initialState : OrderState = {
    currentOrder: {},
    currentOrderId: "",
    order_error: undefined
}

export const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        createOrder: (state, action: PayloadAction<{address?: AddressSettingsForm, card?: PaymentSettingsForm}>) => {
            state.currentOrder.AddressRequest = action.payload.address;
            state.currentOrder.CardRequest = action.payload.card;
        },
        addOrder: (state, action: PayloadAction<OrderResponse>) => {
            state.currentOrder.AddressRequest = action.payload.AddressRequest;
            state.currentOrder.CardRequest = action.payload.CardRequest;
            state.currentOrderId = action.payload.OrderId;
        },
        payCurrentOrder: (state) => {
            state.currentOrder = {};
            state.currentOrderId = "";
        },
        addError: (state,action: PayloadAction<string | undefined>) => {
            state.order_error = action.payload;
        }
    }
})

export const {createOrder, addOrder, payCurrentOrder, addError} = orderSlice.actions

export default orderSlice.reducer;

export const getIsCurrentOrder = (state: RootState) => state.order.currentOrderId.trim().length > 0;
export const getCurrentOrderId = (state: RootState) => state.order.currentOrderId;
export const getOrderError = (state: RootState) => state.order.order_error

export const createOrderListener = (startAppListening: AppStartListening) => {
    startAppListening({
        actionCreator: createOrder,
        effect: async (action, listenerApi) => {
            const state = listenerApi.getState();

            try {
              const orderResponse = await CreateOrderRequest({orderDto: state.order.currentOrder});
              listenerApi.dispatch(addOrder(orderResponse));

              if(state.cart.pendingProductIfOrderDoesNotExist === undefined) throw new Error("Something unexpected happened. the item you are trying to add to the cart was not found");
              listenerApi.dispatch(addItem(state.cart.pendingProductIfOrderDoesNotExist));
              listenerApi.dispatch(deletePendingProduct());
            } catch (error) {
                listenerApi.dispatch(addError("There was a problem with the current order"))
            }
        }
    });
}

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
                listenerApi.dispatch(addError("There was a problem checking which products have been bought"))
            }
        }
    })
}