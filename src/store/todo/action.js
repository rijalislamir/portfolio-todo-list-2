import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { getActivityDetail } from '../activity/action'

export const createTodo = createAsyncThunk(
    'todo/create',
    async (body, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_API}/api/todos`,
                body,
                { headers: { Authorization: `Bearer ${token}` }}
            )

            if (response.data) thunkAPI.dispatch(getActivityDetail({ id: body.activity }))
            
            return response.data
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const deleteTodo = createAsyncThunk(
    'todo/delete',
    async ({ id }, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            const response = await axios.delete(
                `${import.meta.env.VITE_BASE_API}/api/todos/${id}`,
                { headers: { Authorization: `Bearer ${token}` }}
            )
            
            const activityId = thunkAPI.getState().activity.detail._id
            if (response.data) thunkAPI.dispatch(getActivityDetail({ id: activityId }))
            
            return response.data
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        
            return thunkAPI.rejectWithValue(message)
        }
    }
)