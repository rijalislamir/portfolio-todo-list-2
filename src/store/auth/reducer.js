import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: user ? user : null,
    isLoading: false,
    isError: false,
    message: ''
}

export const registerUser = createAsyncThunk(
    'auth/register',
    async (data, thunkAPI) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_LOCAL_API}/api/users/register`, data)

            if (response.data) localStorage.setItem('user', JSON.stringify(response.data))

            return response.data
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const login = createAsyncThunk(
    'auth/login',
    async (data, thunkAPI) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_LOCAL_API}/api/users/login`, data)

            if (response.data) localStorage.setItem('user', JSON.stringify(response.data))

            return response.data
        } catch (error) {
            const message = (error.message && error.response.data && error.response.data.message) || error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const logout = createAsyncThunk(
    'auth/logout',
    async () => await localStorage.removeItem('user')
)

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