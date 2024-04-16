import { configureStore } from "@reduxjs/toolkit"; 
import { autchSlice } from "./Auth/AuthSlice"; 
import { IncidentSlice } from "./Incident/IncidentSlice";



export const store = configureStore({
    reducer: {
        auth: autchSlice.reducer,
        incident: IncidentSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})