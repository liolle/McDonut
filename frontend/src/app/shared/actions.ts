import { createAction, props } from "@ngrx/store";
import { Donuts } from "../class/donut/donut";
import { ApiError, UserProfile } from "../interfaces/api";

export const AuthActions = {
  login: createAction("Login"),
  neutral: createAction("Neutral action"),
  logout: createAction("Logout"),
  profile: createAction("Profile"),
  loadProfileSuccess: createAction(
    "Load Profile Success",
    props<{ profile: UserProfile }>()
  ),
  loadProfileFailure: createAction(
    "Unauthorized",
    props<{ error: { error: { errors: ApiError[] } } }>()
  )
};

export const CartActions = {
  addToCart: createAction("Adding element ", props<{ item: Donuts }>()),
  removeFromCart: createAction("Remove element", props<{ item: Donuts }>()),
  clearCart: createAction("clearing cart")
};
