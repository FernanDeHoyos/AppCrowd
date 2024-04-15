import { configureStore } from "@reduxjs/toolkit"; 
import { autchSlice } from "./Auth/AuthSlice"; 


export const store = configureStore({
    reducer: {
        auth: autchSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})