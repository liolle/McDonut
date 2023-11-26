import { Toppings } from "../toppings/toppings";

export class Donuts {
  id: string; // should be unit DI_<name>_<optional-version>|00 Ex. DI_chocolate_00
  name: string;
  price: number;
  toppings: Toppings[];
  picture: string;
}
