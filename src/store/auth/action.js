import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios"
import { reset as authReset } from './reducer'
import { reset as activityReset } from '../activity/reducer'

export const registerUser = createAsyncThunk(
    'auth/register',
    async (data, thunkAPI) => {
        try {
            const response = await axios.post(`${process.env.VITE_BASE_API}/api/users/register`, data)

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
            const response = await axios.post(`${process.env.VITE_BASE_API}/api/users/login`, data)

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
    async (_, thunkAPI) => {
        localStorage.removeItem('user')

        thunkAPI.dispatch(authReset())
        thunkAPI.dispatch(activityReset())
    }
)