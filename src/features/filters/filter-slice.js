import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   breed: 'all',
   limit: 10,
   order: 'RAND',
}

const filterSlice = createSlice({
   name: '@@filters',
   initialState,
   reducers: {
      setBreed: (state, action) => {state.breed = action.payload},
      setOrder: (state, action) => {state.order = action.payload},
      setLimit: (state, action) => {state.limit = action.payload},
      clearOrder: (state) => {state.order = 'RAND'}
   }
});

export const filterReducer = filterSlice.reducer;
export const {setBreed, setOrder, setLimit, clearOrder} = filterSlice.actions;
export const selectFilters = (state) => state.filters;