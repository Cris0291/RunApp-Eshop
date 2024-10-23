import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { User, UserDto } from './contracts'
import { RootState } from '@/app/utils/store'

const initialState: User = {
    name: "",
    userName: "",
    email: "",
    token: ""
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserDto>) => {
            state.name = action.payload.name,
            state.email = action.payload.email,
            state.userName = action.payload.userName,
            state.token = action.payload.token
        }
    }
})

export const {setUser} = userSlice.actions

export default userSlice.reducer

export const getUserConfirmationOfRegistration = (state : RootState) => !(state.user.token.length === 0)