import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { UpdateUserDto, UserDto } from './contracts'
import { RootState } from '@/app/utils/store'

const initialState: UserDto = {
    name: "",
    userName: "",
    email: "",
    token: "",
    id: ""
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
        }
    }
})

export const {setUser, updateUser} = userSlice.actions

export default userSlice.reducer

export const getUserConfirmationOfRegistration = (state : RootState) => !(state.user.token.length === 0);
export const getUserId = (state: RootState) => state.user.id;
export const getUserToken = (state : RootState) => state.user.token;