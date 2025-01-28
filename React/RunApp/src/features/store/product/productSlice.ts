import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BoughtProducts } from "./contracts";
import { SimpleBoughtProducts } from "../../profiles/userprofile/contracts";
import { RootState } from "@/utils/store";

const initialState: BoughtProducts = {
  boughtProducts: [],
  boughtProductsWithReviews: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setBoughtproducts: (state, action: PayloadAction<SimpleBoughtProducts>) => {
      state.boughtProducts = action.payload.boughtProducts;
      state.boughtProductsWithReviews = action.payload.boughtProductsWithReview;
    },
  },
});

export const { setBoughtproducts } = productSlice.actions;

export default productSlice.reducer;

export const getIsProductBought = (productId: string) => (state: RootState) =>
  state.product.boughtProducts.includes(productId);
export const getIsProductBoughtAndHasReview =
  (productId: string) => (state: RootState) =>
    state.product.boughtProductsWithReviews.includes(productId);
