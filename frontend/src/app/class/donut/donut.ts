import { Toppings } from "../toppings/toppings";

export class Donuts {
  id: string;
  price_id: string;
  name: string;
  price: number;
  toppings: Toppings[];
  picture: string;
}
