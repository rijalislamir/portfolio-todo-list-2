import { createSlice } from '@reduxjs/toolkit'
import {
    createTodo,
    updateTodo,
    deleteTodo
} from './action'

const initialState = {
    isLoading: false,
    isError: false,
    message: ''
}

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        reset: state => {
            state.isLoading = false,
            state.isError = false,
            state.message = ''
        }
    },
    extraReducers: builder => builder
        // createTodo
        .addCase(createTodo.pending, state => {
            state.isLoading = true
        })
        .addCase(createTodo.fulfilled, state => {
            state.isLoading = false
            state.isError = false
            state.message = ''
        })
        .addCase(createTodo.rejected, (state, action) => {
            state.isLoading = false
            state.isError = false
            state.message = action.payload
        })
        
        // updateTodo
        .addCase(updateTodo.pending, state => {
            state.isLoading = true
        })
        .addCase(updateTodo.fulfilled, state => {
            state.isLoading = false
            state.isError = false
            state.message = ''
        })
        .addCase(updateTodo.rejected, (state, action) => {
            state.isLoading = false
            state.isError = false
            state.message = action.payload
        })
        
        // deleteTodo
        .addCase(deleteTodo.pending, state => {
            state.isLoading = true
        })
        .addCase(deleteTodo.fulfilled, state => {
            state.isLoading = false
            state.isError = false
            state.message = ''
        })
        .addCase(deleteTodo.rejected, (state, action) => {
            state.isLoading = false
            state.isError = false
            state.message = action.payload
        })
})

export default todoSlice.reducer