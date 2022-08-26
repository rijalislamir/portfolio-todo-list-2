import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getActivities = createAsyncThunk(
    'activity/get',
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            const response = await axios.get(
                `${import.meta.env.VITE_BASE_API}/api/activities`,
                { headers: { Authorization: `Bearer ${token}` }}
            )
            
            return response.data
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const getActivityDetail = createAsyncThunk(
    'activity/detail',
    async ({ id }, thunkAPI) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_API}/api/activities/${id}`)

            return response.data
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const createActivity = createAsyncThunk(
    'activity/create',
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_API}/api/activities`,
                { name: 'New Activity' },
                { headers: { Authorization: `Bearer ${token}` }}
            )

            if (response.data) thunkAPI.dispatch(getActivities())

            return response.data
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const deleteActivity = createAsyncThunk(
    'activity/delete',
    async ({ id }, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            const response = await axios.delete(
                `${import.meta.env.VITE_BASE_API}/api/activities/${id}`,
                { headers: { Authorization: `Bearer ${token}` }}
            )

            if (response.data) thunkAPI.dispatch(getActivities())

            return response.data
        } catch (error) {
            const message = (error.repsponse && error.response.data && error.response.data.message) || error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    }
)