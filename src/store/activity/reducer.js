import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios'

const initialState = {
    activities: [],
    isLoading: false,
    isError: false,
    message: ''
}

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

export const activitySlice = createSlice({
    name: 'activity',
    initialState,
    extraReducers: builder => builder
        // getActivities
        .addCase(getActivities.pending, state => {
            state.isLoading = true
        })
        .addCase(getActivities.fulfilled, (state, action) => {
            state.activities = action.payload
            state.isLoading = false
            state.isError = false
            state.message = ''
        })
        .addCase(getActivities.rejected, (state, action) => {
            state.activities = []
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
})

export default activitySlice.reducer