import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ProductsQuery } from "./contracts";
import { RootState } from "@/utils/store";

const initialState: ProductsQuery = {
  sortBy: "",
  search: "",
  categories: [],
  priceRange: [],
  starFilters: [],
};

export const productsQuerySlice = createSlice({
  name: "productsQuery",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<ProductsQuery>) => {
      state.search = action.payload.search;
    },
  },
});

export const { setSearch } = productsQuerySlice.actions;

export default productsQuerySlice.reducer;

export const getSearchQueryProduct = (state: RootState) =>
  state.productsQuery.search;
