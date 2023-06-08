import { configureStore } from "@reduxjs/toolkit";
import carSearchSlice from "./features/searchSlice";
import selectionSlice from "./features/selectionSlice";
import productSlice from "./features/productSlice";


export const MyAutoStore = configureStore({
    reducer: {
        searchReducer: carSearchSlice,
        selectionReducer: selectionSlice,
        productsReducer: productSlice
    }
})



export type RootState = ReturnType<typeof MyAutoStore.getState>
export type AppDispatch = typeof MyAutoStore.dispatch