import { configureStore } from "@reduxjs/toolkit"
import authReducer from './auth/reducer'
import activityReducer from './activity/reducer'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        activity: activityReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
})