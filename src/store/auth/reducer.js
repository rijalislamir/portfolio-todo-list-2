import { createSlice } from "@reduxjs/toolkit"
import {
    registerUser,
    login,
    logout
} from './action'

const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: user ? user : null,
    isLoading: false,
    isError: false,
    message: ''
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: builder => builder
        // registerUser
        .addCase(registerUser.pending, state => {
            state.isLoading = true
        })
        .addCase(registerUser.fulfilled, (state, action) => {
            state.user = action.payload
            state.isLoading = false
            state.isError = false
            state.message = ''
        })
        .addCase(registerUser.rejected, (state, action) => {
            state.user = null
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        
        // login
        .addCase(login.pending, state => {
            state.isLoading = true
        })
        .addCase(login.fulfilled, (state, action) => {
            state.user = action.payload
            state.isLoading = false
            state.isError = false
            state.message = ''
        })
        .addCase(login.rejected, (state, action) => {
            state.user = null
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })

        // logout
        .addCase(logout.fulfilled, state => {
            state.user = null
        })
})

export default authSlice.reducer