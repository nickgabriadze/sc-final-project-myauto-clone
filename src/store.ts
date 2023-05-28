import { configureStore } from "@reduxjs/toolkit";
import carSearchSlice from "./features/searchSlice";


export const MyAutoStore = configureStore({
    reducer: {
        searchReducer: carSearchSlice
    }
})