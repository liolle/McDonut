import { createSelector } from "@ngrx/store";
import { Cart } from "../interfaces/cart";
import { UserS } from "./auth/reducer";
import { GeneralS } from "./reducer";
export interface CartState {
  cart: Cart;
}

export interface UserState {
  user: UserS;
}

export interface GeneralState {
  general: GeneralS;
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

export const selectPage = createSelector(
  (state: GeneralState) => state,
  (state: GeneralState) => state.general.currentPage
);
