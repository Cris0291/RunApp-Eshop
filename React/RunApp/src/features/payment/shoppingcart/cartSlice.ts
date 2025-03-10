import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ProductForLineItem } from "./contracts";
import { RootState } from "@/utils/store";
import { AppStartListening } from "@/utils/listenerMiddleware";
import {
  addItemToCart,
  deleteItemToCart,
  updateItemQuantity,
} from "@/services/apiCart";
import { ExistProduct } from "@/services/apiProduct";
import Cookies from "js-cookie";
import { OrderItems } from "../checkout/contracts";
import { GetCurrentOrder } from "@/services/apiOrders";
import { setOrderError } from "@/features/login/loginSlice";
import { AxiosError } from "axios";

const currentOrderText = Cookies.get("Order");
const orderCookie: OrderItems | undefined = currentOrderText
  ? JSON.parse(currentOrderText)
  : undefined;

type cartState = {
  products: ProductForLineItem[];
  currentProducId: string;
  pendingProductIfOrderDoesNotExist?: ProductForLineItem;
  cart_error?: string;
};

const initialState: cartState = {
  products: orderCookie ? orderCookie.items : [],
  currentProducId: "",
  pendingProductIfOrderDoesNotExist: undefined,
  cart_error: undefined,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<ProductForLineItem>) => {
      state.currentProducId = action.payload.id;
      state.products.push(action.payload);
    },
    deleteItem: (state, action: PayloadAction<string>) => {
      state.currentProducId = action.payload;
      state.products = state.products.filter((x) => x.id !== action.payload);
    },
    deleteItemWithoutListening: (state, action: PayloadAction<string>) => {
      state.currentProducId = action.payload;
      state.products = state.products.filter((x) => x.id !== action.payload);

      const currentOrderText = Cookies.get("Order");
      const orderCookie: OrderItems | undefined = currentOrderText
        ? JSON.parse(currentOrderText)
        : undefined;

      if (orderCookie) {
        orderCookie.items = orderCookie.items.filter(
          (item) => item.id !== state.currentProducId
        );
        Cookies.set("Order", JSON.stringify(orderCookie));
      }
    },
    increaseItemQuantity: (state, action: PayloadAction<string>) => {
      try {
        console.log("cart1");
        const product = state.products.find((x) => x.id === action.payload);
        if (product == undefined) throw new Error("Cart item was not found");
        console.log("cart2");
        if (product.quantity === null)
          throw new Error("Quantity should not be undefined");
        console.log("cart3");
        state.currentProducId = product.id;
        product.quantity += 1;

        product.totalPrice =
          product.quantity *
          (product.priceWithDiscount === null
            ? product.price
            : product.priceWithDiscount);
        console.log("cart4");
      } catch (error) {
        console.log("carts5");
        state.cart_error =
          "There was a problem with the item selected and the quantity you are trying to increase";
      }
    },
    decreaseItemQuantity: (state, action: PayloadAction<string>) => {
      try {
        const product = state.products.find((x) => x.id === action.payload);
        if (product == undefined) throw new Error("Cart item was not found");
        if (product.quantity === null)
          throw new Error("Quantity should not be undefined");

        state.currentProducId = product.id;
        product.quantity -= 1;

        product.totalPrice =
          product.quantity *
          (product.priceWithDiscount === null
            ? product.price
            : product.priceWithDiscount);

        if (product.quantity <= 0) {
          product.quantity = 1;
          product.totalPrice =
            product.quantity *
            (product.priceWithDiscount === null
              ? product.price
              : product.priceWithDiscount);
        }
      } catch (error) {
        state.cart_error =
          "There was a problem with the item selected and the quantity you are trying to decrease";
      }
    },
    changeItemQuantity: (
      state,
      action: PayloadAction<{ productId: string; newQuantity: number }>
    ) => {
      try {
        const product = state.products.find(
          (x) => x.id === action.payload.productId
        );
        if (product == undefined) throw new Error("Cart item was not found");

        state.currentProducId = product.id;

        product.quantity = action.payload.newQuantity;
        product.totalPrice =
          product.quantity *
          (product.priceWithDiscount === null
            ? product.price
            : product.priceWithDiscount);

        if (action.payload.newQuantity <= 0) {
          product.quantity = 1;
          product.totalPrice =
            product.quantity *
            (product.priceWithDiscount === null
              ? product.price
              : product.priceWithDiscount);
        }

        if (Number.isNaN(action.payload.newQuantity)) {
          product.quantity = null;
          product.totalPrice = 0;
        }
      } catch (error) {
        state.cart_error =
          "There was a problem with the item selected and the quantity you are trying to change";
      }
    },
    clearCart: (state) => {
      state.products = [];
      state.currentProducId = "";
      state.pendingProductIfOrderDoesNotExist = undefined;
    },
    addCartError: (state, action: PayloadAction<string | undefined>) => {
      state.cart_error = action.payload;
    },
    addCurrentItems: (state, action: PayloadAction<ProductForLineItem[]>) => {
      state.products = [...action.payload];
    },
    addItemsDueToDeletion: (state) => {
      state.products = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  changeItemQuantity,
  clearCart,
  addCartError,
  addCurrentItems,
  deleteItemWithoutListening,
  addItemsDueToDeletion,
} = cartSlice.actions;

export default cartSlice.reducer;

export const getTotalPrice = (state: RootState) =>
  state.cart.products.reduce((sum, item) => {
    const priceToReduce =
      item.priceWithDiscount === null ? item.price : item.priceWithDiscount;
    const quantityPeritem = item.quantity === null ? 0 : item.quantity;
    return sum + priceToReduce * quantityPeritem;
  }, 0);

export const getTotalItems = (state: RootState) =>
  state.cart.products.reduce((sum, item) => {
    if (item.quantity === null) return sum + 0;

    return sum + item.quantity;
  }, 0);

export const getCartItems = (state: RootState) => state.cart.products;
export const getCartError = (state: RootState) => state.cart.cart_error;
export const getIsProductsAddedToCart = (productId: string) => {
  return (state: RootState) => {
    const product = state.cart.products.find(
      (product) => product.id === productId
    );
    return product ? true : false;
  };
};

export const addChangeQuantityListener = (
  startAppListening: AppStartListening
) => {
  startAppListening({
    matcher: isAnyOf(
      increaseItemQuantity,
      decreaseItemQuantity,
      changeItemQuantity
    ),
    effect: async (action, listenerApi) => {
      try {
        listenerApi.cancelActiveListeners();

        await listenerApi.delay(1000);

        const state = listenerApi.getState();

        const cartState = state.cart;
        const orderState = state.order;
        console.log("cart6");
        const product = cartState.products.find(
          (x) => x.id === cartState.currentProducId
        );
        console.log("cart7");
        if (product == undefined) throw new Error("Cart item was not found");
        if (orderState.currentOrderId.trim().length === 0)
          throw new Error("Something unexpected happened, order was not added");
        console.log("cart8");
        const result = await ExistProduct(cartState.currentProducId);
        console.log("cart9");
        if (result !== 200)
          throw new Error(
            "Testing. Requested item was not find in the database"
          );
        console.log("cart10");
        if (product.quantity !== null)
          await updateItemQuantity({
            orderId: orderState.currentOrderId,
            productId: cartState.currentProducId,
            quantity: product.quantity,
          });
        console.log("cart11");
        const currentOrderText = Cookies.get("Order");
        const orderCookie: OrderItems | undefined = currentOrderText
          ? JSON.parse(currentOrderText)
          : undefined;
        console.log("cart12");
        if (orderCookie) {
          orderCookie.items = orderCookie.items.map((item) => {
            if (item.id === cartState.currentProducId) {
              item.quantity = product.quantity;
              item.totalPrice = product.totalPrice;
              return item;
            } else {
              return item;
            }
          });
          console.log("cart13");
          Cookies.set("Order", JSON.stringify(orderCookie));
          console.log("cart14");
        }
      } catch (error) {
        console.log("cart15");
      }
    },
  });
};

export const addItemListener = (startAppListening: AppStartListening) => {
  startAppListening({
    actionCreator: addItem,
    effect: async (action, listenerApi) => {
      const state = listenerApi.getState();

      const cartState = state.cart;
      const orderState = state.order;
      try {
        const product = cartState.products.find(
          (x) => x.id === cartState.currentProducId
        );
        if (product == undefined) throw new Error("Cart item was not found");

        const result = await ExistProduct(cartState.currentProducId);
        if (result !== 200)
          throw new Error(
            "Testing. Requested item was not find in the database"
          );

        if (orderState.currentOrderId.trim().length === 0)
          throw new Error("Something unexpected happened, order was not added");

        await addItemToCart({
          productForCart: product,
          orderId: orderState.currentOrderId,
        });

        const currentOrderText = Cookies.get("Order");
        const orderCookie: OrderItems | undefined = currentOrderText
          ? JSON.parse(currentOrderText)
          : undefined;

        if (orderCookie) {
          orderCookie.items = [...orderCookie.items, product];
          Cookies.set("Order", JSON.stringify(orderCookie));
        }
      } catch (error) {
        listenerApi.dispatch(
          deleteItemWithoutListening(cartState.currentProducId)
        );
        listenerApi.dispatch(
          addCartError(
            "There was error while permorming an action on the new item"
          )
        );
      }
    },
  });
};

export const deleteItemListener = (startAppListening: AppStartListening) => {
  startAppListening({
    actionCreator: deleteItem,
    effect: async (action, listenerApi) => {
      try {
        const state = listenerApi.getState();

        const cartState = state.cart;
        const orderState = state.order;

        const result = await ExistProduct(cartState.currentProducId);
        if (result !== 200)
          throw new Error(
            "Testing. Requested item was not find in the database"
          );

        if (orderState.currentOrderId.trim().length === 0)
          throw new Error("Something unexpected happened, order was not added");

        await deleteItemToCart({
          orderId: orderState.currentOrderId,
          productId: cartState.currentProducId,
        });

        const currentOrderText = Cookies.get("Order");
        const orderCookie: OrderItems | undefined = currentOrderText
          ? JSON.parse(currentOrderText)
          : undefined;

        if (orderCookie) {
          orderCookie.items = orderCookie.items.filter(
            (item) => item.id !== cartState.currentProducId
          );
          Cookies.set("Order", JSON.stringify(orderCookie));
        }
      } catch (error) {
        listenerApi.dispatch(
          addCartError(
            "There was error while permorming an action on the deleted item"
          )
        );
      }
    },
  });
};

export const addItemsDueToDeletionListener = (
  startAppListening: AppStartListening
) => {
  startAppListening({
    actionCreator: addItemsDueToDeletion,
    effect: async (action, listenerApi) => {
      try {
        const response = await GetCurrentOrder();

        if (response instanceof AxiosError) {
          listenerApi.dispatch(setOrderError(response));
        } else {
          if (response.order !== null) {
            const currentOrder = response.order;

            const currentItems: ProductForLineItem[] = currentOrder.items.map(
              (item) => {
                return {
                  id: item.productId,
                  name: item.name,
                  quantity: item.quantity,
                  price: item.price,
                  priceWithDiscount: item.priceWithDiscount,
                  totalPrice: item.totalPrice,
                };
              }
            );

            const currentOrderText = Cookies.get("Order");
            const orderCookie: OrderItems | undefined = currentOrderText
              ? JSON.parse(currentOrderText)
              : undefined;

            if (orderCookie) {
              orderCookie.items = currentItems;
              Cookies.set("Order", JSON.stringify(orderCookie));
            }
          }
        }
      } catch (error) {
        listenerApi.dispatch(
          addCartError(
            "There was error while permorming an action on the cart items"
          )
        );
      }
    },
  });
};
