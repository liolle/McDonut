import { Toppings } from '../toppings/toppings'

export class Donuts {
  id: string
  name: string
  price: number
  toppings: Toppings[]
  picture: string
}

export class RawDonuts {
  donut_id: string
  topping_id: string
  donut_name: string
  topping_name: string
  donut_price: number
  topping_price: number
  picture: string
}
