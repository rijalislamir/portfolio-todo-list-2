import { createSlice } from "@reduxjs/toolkit"
import {
    getActivities,
    getActivityDetail,
    createActivity,
    deleteActivity
} from "./action"

const initialState = {
    activities: [],
    detail: {
        _id: null,
        name: null,
        todos: []
    },
    isLoading: false,
    isError: false,
    message: ''
}

export const activitySlice = createSlice({
    name: 'activity',
    initialState,
    reducers: {
        reset: state => {
            state.activities = [],
            state.isLoading = false,
            state.isError = false,
            state.message = ''
        }
    },
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
        
        // getActivityDetail
        .addCase(getActivityDetail.pending, state => {
            state.isLoading = true
        })
        .addCase(getActivityDetail.fulfilled, (state, action) => {
            state.detail = action.payload
            state.isLoading = false
            state.isError = false
            state.message = ''
        })
        .addCase(getActivityDetail.rejected, (state, action) => {
            state.detail = null
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
        
        // deleteActivity
        .addCase(deleteActivity.pending, state => {
            state.isLoading = true
        })
        .addCase(deleteActivity.fulfilled, state => {
            state.isLoading = false
            state.isError = false
            state.message = ''
        })
        .addCase(deleteActivity.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
})

export const { reset } = activitySlice.actions

export default activitySlice.reducer