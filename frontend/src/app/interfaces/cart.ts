import { Donuts } from "../class/donut/donut";

export interface Cart {
  total: number;
  items: Map<string, CartElement>;
}

export interface CartElement {
  donut: Donuts;
  quantity: number;
}
