import { Donuts } from "../../class/donut/donut";
import { CartElement } from "../../interfaces/cart";

export const addMap = (
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

export const removeMap = (
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

export const clearMap = (initial_cart: Map<string, CartElement>) => {
  const new_cart: Map<string, CartElement> = new Map(initial_cart);

  for (const key of new_cart.keys()) {
    new_cart.delete(key);
  }
  return new_cart;
};
