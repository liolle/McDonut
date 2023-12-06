import { createSelector } from "@ngrx/store";
import { Cart } from "../interfaces/cart";
import { User } from "./auth/reducer";

export interface CartState {
  cart: Cart;
}

export interface UserState {
  user: User;
}

export const selectCart = createSelector(
  (state: CartState) => state,
  (state: CartState) => state.cart
);
export const selectUser = createSelector(
  (state: UserState) => state,
  (state: UserState) => state.user
);
