import { createAction, props } from "@ngrx/store";
import { Donuts } from "../../class/donut/donut";

export const addToCart = createAction(
  "Adding element to Cart",
  props<{ item: Donuts }>()
);
export const removeFromCart = createAction(
  "Remove element to Cart",
  props<{ item: Donuts }>()
);
export const clearCart = createAction("clearing cart");
