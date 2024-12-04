import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AddressSettingsForm, OrderDto, OrderResponse, PaymentSettingsForm } from "./contracts"
import { RootState } from "@/app/utils/store"
import { AppStartListening } from "@/app/utils/listenerMiddleware"
import { CreateOrderRequest } from "@/app/services/apiOrders"
import { addItem, addPendingProduct, deletePendingProduct } from "../shoppingcart/cartSlice"

type OrderState = {
    currentOrder: OrderDto,
    currentOrderId: string,
}

const initialState : OrderState = {
    currentOrder: {},
    currentOrderId: "",
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
        }
    }
})

export const {createOrder, addOrder} = orderSlice.actions

export default orderSlice.reducer;

export const getIsCurrentOrder = (state: RootState) => state.order.currentOrderId.trim().length > 0;
export const getCurrentOrderId = (state: RootState) => state.order.currentOrderId;

export const createOrderListener = (startAppListening: AppStartListening) => {
    startAppListening({
        actionCreator: createOrder,
        effect: async (action, listenerApi) => {
            const state = listenerApi.getState();
            const token = state.user.token;

            const orderResponse = await CreateOrderRequest({orderDto: state.order.currentOrder, token});
            listenerApi.dispatch(addOrder(orderResponse));

            if(state.cart.pendingProductIfOrderDoesNotExist === undefined) throw new Error("Something unexpected happened. the item you are trying to add to the cart was not found");
            listenerApi.dispatch(addItem(state.cart.pendingProductIfOrderDoesNotExist));
            listenerApi.dispatch(deletePendingProduct());
        }
    });
}