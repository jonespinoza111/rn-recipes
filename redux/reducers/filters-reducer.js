import { createSlice } from "@reduxjs/toolkit";

const initialFilters = {
    category: [],
    diet: [],
    intolerance: [],
    cuisine: []
}

export const filtersSlice = createSlice({
  name: 'filters',
  initialState: initialFilters,
  reducers: {
    updateFilters: (state, action) => {
      return { ...action.payload }
    },
    clearFilters: () => {
      return initialState;
    }
  }
})

export const { updateFilters, clearFilters } = filtersSlice.actions

export default filtersSlice.reducer;