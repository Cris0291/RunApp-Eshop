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

const initData = localStorage.getItem("userSession");
const userSession: UserSession =
  initData !== null ? JSON.parse(initData) : null;

const initialState: UserWithSettingsDto = {
  name: userSession === null ? "" : userSession.name,
  userName: userSession === null ? "" : userSession.userName,
  email: userSession === null ? "" : userSession.email,
  address: undefined,
  card: undefined,
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

export const getUserConfirmationOfRegistration = (state: RootState) =>
  state.user.name !== "" && localStorage.getItem("tokenModel") !== null;
export const getUserAddress = (state: RootState) => state.user.address;
export const getUserPaymentMethod = (state: RootState) => state.user.card;
