import { createSlice } from "@reduxjs/toolkit";

interface SelectionState {
  deal_type: boolean;
  manufacturer_type: boolean;
  category_type: boolean;
  models_type: boolean;
  openedModelGroups: string[];
}

const initialState: SelectionState = {
  deal_type: false,
  manufacturer_type: false,
  category_type: false,
  models_type: false,
  openedModelGroups: [],
};

const SelectionSlice = createSlice({
  name: "Selection Slice",
  initialState,
  reducers: {
    setSearchingTypeState: (state, action) => {
      return {
        ...state,
        deal_type: action.payload.deal_type,
        manufacturer_type: action.payload.manufacturer_type,
        category_type: action.payload.category_type,
        models_type: action.payload.models_type,
      };
    },

    setOpenedModelGroups: (
      state,
      action: { type: string; payload: { modelGroups: string[] } }
    ) => {
      return { ...state, openedModelGroups: action.payload.modelGroups };
    },
  },
});

export const { setSearchingTypeState, setOpenedModelGroups } = SelectionSlice.actions;
export default SelectionSlice.reducer;
