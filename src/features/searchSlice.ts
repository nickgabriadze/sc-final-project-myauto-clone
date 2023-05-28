import { createSlice } from "@reduxjs/toolkit";

interface SearchState {
  main_type: string; //car, tractor or motorcycle
  deal_type: string; //for sale or for rent
  manufacturers: string[];
  categories: string[]; // main_type into detail
  currency: boolean; //gel or dollar
  pricesFromTo: number[];
}

const initialState: SearchState = {
  main_type: "cars",
  deal_type: "იყიდება",
  manufacturers: [],
  categories: [],
  currency: false,
  pricesFromTo: [0, 0],
};

const CarSearchSlice = createSlice({
  name: "Search slice",
  initialState,
  reducers: {
    setMainType: (state, action) => {
      return {
        ...state,
        main_type: action.payload.main_type,
      };
    },

    setDealType: (state, action) => {
      return {
        ...state,
        deal_type: action.payload.deal_type,
      };
    },

    setManuFacturers: (state, action) => {
      return {
        ...state,
        manufacturers: action.payload.manufacturers,
      };
    },

    setCategories: (state, action) => {
      return {
        ...state,
        categories: action.payload.categories,
      };
    },

    setCurrency: (state, action) => {
      return {
        ...state,
        currency: action.payload.currency,
      };
    },

    setPricesFromTo: (state, action) => {
      return {
        ...state,
        pricesFromTo: action.payload.pricesFromTo,
      };
    },
  },
});

export const {setMainType} = CarSearchSlice.actions
export default CarSearchSlice.reducer