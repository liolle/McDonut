import { createReducer, on, createSelector } from "@ngrx/store";
import { Cart, CartElement } from "../../interfaces/cart";
import { CartActions } from "../actions";
import { addMap, removeMap, clearMap } from "./functions";

const initialState: Cart = {
  total: 0,
  items: new Map<string, CartElement>()
};

export const cartReducer = createReducer(
  initialState,
  on(CartActions.addToCart, (state, { item }) => {
    const updatedItems = addMap(state.items, item);
    const updatedTotal = state.total + item.price;

    return {
      total: updatedTotal,
      items: updatedItems
    };
  }),
  on(CartActions.removeFromCart, (state, { item }) => {
    removeMap(state.items, item);
    const new_price = state.total - item.price;
    return {
      total: new_price >= 0 ? new_price : 0,
      items: removeMap(state.items, item)
    };
  }),
  on(CartActions.clearCart, (state) => {
    return {
      total: 0,
      items: clearMap(state.items)
    };
  })
);

interface CartState {
  cart: Cart;
}
