import { configureStore } from "@reduxjs/toolkit"
import authReducer from './auth/reducer'
import activityReducer from './activity/reducer'
import todoReducer from './todo/reducer'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        activity: activityReducer,
        todo: todoReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
})