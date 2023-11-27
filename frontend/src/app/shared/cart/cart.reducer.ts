import { createReducer, on, createSelector } from "@ngrx/store";
import { addToCart, removeFromCart, clearCart } from "./cart.actions";
import { Donuts } from "../../class/donut/donut";
import { Cart, CartElement } from "../../interfaces/cart";

export const initialState: Cart = {
  total: 0,
  items: new Map<string, CartElement>()
};

export const cartReducer = createReducer(
  initialState,
  on(addToCart, (state, { item }) => {
    const updatedItems = addMap(state.items, item);
    const updatedTotal = state.total + item.price;

    return {
      total: updatedTotal,
      items: updatedItems
    };
  }),
  on(removeFromCart, (state, { item }) => {
    removeMap(state.items, item);
    const new_price = state.total - item.price;
    return {
      total: new_price >= 0 ? new_price : 0,
      items: removeMap(state.items, item)
    };
  }),
  on(clearCart, (state) => {
    return {
      total: 0,
      items: clearMap(state.items)
    };
  })
);

const addMap = (
  map: Map<string, CartElement>,
  donut: Donuts
): Map<string, CartElement> => {
  const new_map: Map<string, CartElement> = new Map(map);
  const map_element = new_map.get(donut.name);

  if (!map_element) {
    new_map.set(donut.name, {
      donut: donut,
      quantity: 1
    });
  } else {
    new_map.set(donut.name, {
      donut: donut,
      quantity: map_element.quantity + 1
    });
  }
  return new_map;
};

const removeMap = (
  map: Map<string, CartElement>,
  donut: Donuts
): Map<string, CartElement> => {
  const new_map: Map<string, CartElement> = new Map(map);
  const map_element = new_map.get(donut.name);

  if (!map_element) return new_map;

  if (map_element.quantity <= 1) {
    new_map.delete(donut.name);
  } else {
    new_map.set(donut.name, {
      donut: donut,
      quantity: map_element.quantity - 1
    });
  }
  return new_map;
};

const clearMap = (initial_cart: Map<string, CartElement>) => {
  const new_cart: Map<string, CartElement> = new Map(initial_cart);

  for (const key of new_cart.keys()) {
    new_cart.delete(key);
  }
  return new_cart;
};

interface AppState {
  cart: Cart;
}

export const selectCart = createSelector(
  (state: AppState) => state,
  (state: AppState) => state.cart
);
