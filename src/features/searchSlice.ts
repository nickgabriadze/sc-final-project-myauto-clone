import { createSlice } from "@reduxjs/toolkit";

interface SearchState {
  main_type: string; //car, tractor or motorcycle
  deal_type: number[]; //for sale or for rent
  manufacturers: { man_name: string; man_id: number }[];
  categories:{ cat_name: string; cat_id: number }[]; // main_type into detail
  currency: boolean; //gel or dollar
  pricesFrom: number;
  pricesTo: number;
  models: {man_id: number, model_name: string, model_id: number, model_group: string}[];
}

const initialState: SearchState = {
  main_type: "cars",
  deal_type: [],
  manufacturers: [],
  categories: [],
  models: [],
  currency: false,
  pricesFrom: 0,
  pricesTo: 0,
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

    setDealType: (
      state,
      action: { type: string; payload: { deal_type: number[] } }
    ) => {
      return {
        ...state,
        deal_type: action.payload.deal_type,
      };
    },

    setManuFacturers: (
      state,
      action: {
        type: string;
        payload: { manufacturers: { man_name: string; man_id: number }[] };
      }
    ) => {
      
      return {
        ...state,
        manufacturers: action.payload.manufacturers,
      };
    },

    setModels: (
      state,
      action: { type: string; payload:{models: {man_id: number, model_name: string, model_id: number, model_group: string}[]} }
    ) => {
    
      return {
        ...state,
        models: action.payload.models,
      };
    },

    setCategories: (
      state,
      action: {
        type: string;
        payload: {
          categories: { cat_name: string; cat_id: number }[];
        };
      }
    ) => {

      return {
        ...state,
        categories: action.payload.categories,
      };
    },

    setCurrency: (
      state,
      action: {
        type: string;
        payload: {
          currency: boolean;
        };
      }
    ) => {
      return {
        ...state,
        currency: action.payload.currency,
      };
    },

    setPricesFrom: (
      state,
      action: {
        type: string;
        payload: {
          pricesFrom: number;
        };
      }
    ) => {
      return {
        ...state,
        pricesFrom: action.payload.pricesFrom,
      };
    },
    setPricesTo: (
      state,
      action: {
        type: string;
        payload: {
          pricesTo: number;
        };
      }
    ) => {
      return {
        ...state,
        pricesTo: action.payload.pricesTo,
      };
    },
  },
});

export const {
  setMainType,
  setDealType,
  setManuFacturers,
  setCategories,
  setCurrency,
  setPricesFrom,
  setPricesTo,
  setModels
} = CarSearchSlice.actions;
export default CarSearchSlice.reducer;
