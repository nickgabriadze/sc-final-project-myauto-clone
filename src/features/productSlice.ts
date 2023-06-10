import { createSlice } from "@reduxjs/toolkit";
import { Products} from "../components/products/productsInterfaces";





interface ProductsState {
    sortPeriod: number,
    sortIncDec: number,
    products: Products,
    page: number
}

const initialState: ProductsState= {
    sortPeriod: 0,
    sortIncDec: 1,
    products: {
        items: [],
        meta: {
            total: 0,
            per_page: 15,
            current_page: 1,
            last_page: 0
        }
    },
    page: 1
}

const productsSlice = createSlice({
    name: "Products",
    initialState,
    reducers: {
        setSortPeriod: (state, action: {type: string, payload: {sortPeriod: number}}) => {
            return {
                ...state,
                sortPeriod: action.payload.sortPeriod
            }
        },

        setSortIncDec: (state, action: {type: string, payload: {sortIncDec: number}}) => {
            return {
                ...state,
                sortIncDec: action.payload.sortIncDec
            }
        },
        setProducts: (state, action: {type: string, payload: {products: Products}}) => {

            return {
                ...state,
                products: action.payload.products
                
            }
        }
        ,
        setPage: (state, action: {type: string, payload: {page: number}}) => {
            return {
                ...state,
                page: action.payload.page
            }
        }
    }
})

export const {setPage, setSortPeriod, setSortIncDec, setProducts} = productsSlice.actions;
export default productsSlice.reducer