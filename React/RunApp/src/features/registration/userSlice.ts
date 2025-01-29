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
    clearUser: (state) => {
      state.name = "";
      state.email = "";
      state.userName = "";
    },
  },
});

export const { setUser, updateUser, addUserAddress, addUserCard, clearUser } =
  userSlice.actions;

export default userSlice.reducer;

export const getUserAddress = (state: RootState) => state.user.address;
export const getUserPaymentMethod = (state: RootState) => state.user.card;
