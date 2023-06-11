import { createSlice } from "@reduxjs/toolkit";
import { Products} from "../components/products/productsInterfaces";





interface ProductsState {
    sortPeriod: number,
    sortIncDec: number,
    products: Products,
    page: number,
    searchLink: string,
    pressedSearch: boolean
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
    page: 1,
    searchLink: '',
    pressedSearch: false
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
        },

        setSearchLink: (state, action: {type: string, payload: {searchLink: string}}) => {

            return {
                ...state,
                searchLink: action.payload.searchLink
            }
        },

        setPressedSearch: (state, action: {type: string, payload: {pressedSearch: true}}) => {
            return {
                ...state,
                pressedSearch: action.payload.pressedSearch
            }
        }
    }
})

export const {setPage, setSortPeriod, setSortIncDec, setProducts, setSearchLink, setPressedSearch} = productsSlice.actions;
export default productsSlice.reducer