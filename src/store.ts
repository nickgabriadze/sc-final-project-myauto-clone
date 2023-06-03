import { configureStore } from "@reduxjs/toolkit";
import carSearchSlice from "./features/searchSlice";
import selectionSlice from "./features/selectionSlice";


export const MyAutoStore = configureStore({
    reducer: {
        searchReducer: carSearchSlice,
        selectionReducer: selectionSlice
    }
})



export type RootState = ReturnType<typeof MyAutoStore.getState>
export type AppDispatch = typeof MyAutoStore.dispatch