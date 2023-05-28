import { configureStore } from "@reduxjs/toolkit";
import carSearchSlice from "./features/searchSlice";


export const MyAutoStore = configureStore({
    reducer: {
        searchReducer: carSearchSlice
    }
})



export type RootState = ReturnType<typeof MyAutoStore.getState>
export type AppDispatch = typeof MyAutoStore.dispatch