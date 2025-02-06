import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { UpdateUserDto, UserSession, UserWithSettingsDto } from "./contracts";
import { RootState } from "@/utils/store";
import {
  AddressResponse,
  AddressSettingsForm,
  PaymentResponse,
  PaymentSettingsForm,
} from "../payment/checkout/contracts";
import Cookies from "js-cookie";
import { AppStartListening } from "@/utils/listenerMiddleware";
import {
  ModifyOrderAddress,
  ModifyOrderPaymentMethod,
} from "@/services/apiOrders";
import {
  addOrderAddressWithoutListener,
  addOrderPaymentWithoutListener,
} from "../payment/checkout/orderSlice";

const initData = Cookies.get("Session");
const userSession: UserSession | undefined = initData
  ? JSON.parse(initData)
  : undefined;

const addressDataText = Cookies.get("Address");
const addressData: AddressSettingsForm | undefined = addressDataText
  ? JSON.parse(addressDataText)
  : undefined;

const paymentText = Cookies.get("Payment");
const paymentData: PaymentSettingsForm | undefined = paymentText
  ? JSON.parse(paymentText)
  : undefined;

const initialState: UserWithSettingsDto = {
  name: userSession ? userSession.name : "",
  userName: userSession ? userSession.userName : "",
  email: userSession ? userSession.email : "",
  address: addressData ? addressData : undefined,
  card: paymentData ? paymentData : undefined,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserSession>) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.userName = action.payload.userName;
    },
    updateUser: (state, action: PayloadAction<UpdateUserDto>) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.userName = action.payload.userName;
    },
    addUserAddress: (
      state,
      action: PayloadAction<AddressSettingsForm | AddressResponse>
    ) => {
      state.address = action.payload;
    },
    addUserCard: (
      state,
      action: PayloadAction<PaymentSettingsForm | PaymentResponse>
    ) => {
      state.card = action.payload;
    },
    addUserAddressWithListener: (
      state,
      action: PayloadAction<AddressSettingsForm | AddressResponse>
    ) => {
      state.address = action.payload;
      Cookies.set("Address", JSON.stringify(action.payload));
    },
    addUserCardWithListener: (
      state,
      action: PayloadAction<PaymentSettingsForm | PaymentResponse>
    ) => {
      state.card = action.payload;
      Cookies.set("Payment", JSON.stringify(action.payload));
    },
    clearUser: (state) => {
      state.name = "";
      state.email = "";
      state.userName = "";
    },
  },
});

export const {
  setUser,
  updateUser,
  addUserAddress,
  addUserCard,
  clearUser,
  addUserAddressWithListener,
  addUserCardWithListener,
} = userSlice.actions;

export default userSlice.reducer;

export const getUserAddress = (state: RootState) => state.user.address;
export const getUserPaymentMethod = (state: RootState) => state.user.card;

export const addressUserListener = (startAppListening: AppStartListening) => {
  startAppListening({
    actionCreator: addUserAddressWithListener,
    effect: async (action, listenerApi) => {
      const state = listenerApi.getState();
      const orderId = state.order.currentOrderId;

      try {
        const address = await ModifyOrderAddress({
          orderId: orderId,
          addressInfo: action.payload,
        });

        listenerApi.dispatch(
          addOrderAddressWithoutListener({
            address: address.address,
            city: address.city,
            state: address.state,
            zipcode: address.zipcode,
            country: address.country,
          })
        );
      } catch (error) {}
    },
  });
};

export const paymentUserListener = (startAppListening: AppStartListening) => {
  startAppListening({
    actionCreator: addUserCardWithListener,
    effect: async (action, listenerApi) => {
      const state = listenerApi.getState();
      const orderId = state.order.currentOrderId;

      try {
        const payment = await ModifyOrderPaymentMethod({
          orderId: orderId,
          paymentInfo: action.payload,
        });

        listenerApi.dispatch(
          addOrderPaymentWithoutListener({
            cardnumber: payment.cardnumber,
            cardname: payment.cardname,
            expirydate: payment.expirydate,
            cvv: payment.cvv,
          })
        );
      } catch (error) {}
    },
  });
};
