import { createSelector } from "@ngrx/store";
import { Cart } from "../interfaces/cart";
import { UserS } from "./auth/reducer";

export interface CartState {
  cart: Cart;
}

export interface UserState {
  user: UserS;
}

export const selectCart = createSelector(
  (state: CartState) => state,
  (state: CartState) => state.cart
);
export const selectUser = createSelector(
  (state: UserState) => state,
  (state: UserState) => state.user
);

export const selectStatus = createSelector(
  (state: UserState) => state,
  (state: UserState) => state.user.status
);
