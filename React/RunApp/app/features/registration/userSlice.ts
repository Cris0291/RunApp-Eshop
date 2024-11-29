import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { UpdateUserDto, UserDto, UserWithSettingsDto } from './contracts'
import { RootState } from '@/app/utils/store'
import { AddressSettingsForm, PaymentSettingsForm } from '../payment/checkout/contracts'
import { AppStartListening } from '@/app/utils/listenerMiddleware'

const initialState: UserWithSettingsDto = {
    name: "",
    userName: "",
    email: "",
    token: "",
    id: "",
    address: undefined,
    card: undefined,
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserDto>) => {
            state.name = action.payload.name,
            state.email = action.payload.email,
            state.userName = action.payload.userName,
            state.id = action.payload.id,
            state.token = action.payload.token
        },
        updateUser: (state, action: PayloadAction<UpdateUserDto>) => {
            state.name = action.payload.name,
            state.email = action.payload.email,
            state.userName = action.payload.userName
        },
        addUserAddress: (state, action: PayloadAction<AddressSettingsForm>) => {
            state.address = action.payload;
        },
        addUserCard: (state, action: PayloadAction<PaymentSettingsForm>) => {
            state.card = action.payload;
        }
    }
})

export const {setUser, updateUser} = userSlice.actions

export default userSlice.reducer

export const getUserConfirmationOfRegistration = (state : RootState) => !(state.user.token.length === 0);
export const getUserId = (state: RootState) => state.user.id;
export const getUserToken = (state : RootState) => state.user.token;
