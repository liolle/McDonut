import { createAction, props } from "@ngrx/store";
import { Donuts } from "../class/donut/donut";

interface ApiError {
  message: string;
}

interface UserProfile {
  email: string;
  role: "user" | "admin";
  createdAt: Date;
}

export const AuthActions = {
  login: createAction("Login"),
  logout: createAction("Logout"),
  profile: createAction("Profile"),
  loadProfileSuccess: createAction(
    "Load Profile Success",
    props<{ profile: UserProfile }>()
  ),
  loadProfileFailure: createAction(
    "Unauthorized",
    props<{ error: { errors: ApiError[] } }>()
  )
};

export const CartActions = {
  addToCart: createAction("Adding element ", props<{ item: Donuts }>()),
  removeFromCart: createAction("Remove element", props<{ item: Donuts }>()),
  clearCart: createAction("clearing cart")
};
