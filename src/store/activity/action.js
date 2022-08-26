import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getActivities = createAsyncThunk(
    'activity/get',
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            const response = await axios.get(`${import.meta.env.VITE_BASE_LOCAL_API}/api/activities`, { headers: { Authorization: `Bearer ${token}` }})

            return response.data
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    }
)