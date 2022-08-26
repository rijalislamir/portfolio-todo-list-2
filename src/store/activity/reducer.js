import { createSlice } from "@reduxjs/toolkit"
import { getActivities, createActivity } from "./action"

const initialState = {
    activities: [],
    isLoading: false,
    isError: false,
    message: ''
}

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
        
        // createActivity
        .addCase(createActivity.pending, state => {
            state.isLoading = true
        })
        .addCase(createActivity.fulfilled, state => {
            state.isLoading = false
            state.isError = false
            state.message = ''
        })
        .addCase(createActivity.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
})

export default activitySlice.reducer