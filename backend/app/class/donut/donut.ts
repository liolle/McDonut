import { Toppings } from '../toppings/toppings'

export class Donuts {
  public id: string
  public name: string
  public price: number
  public toppings: Toppings[]
  public picture: string
}

export class RawDonuts {
  public donut_id: string
  public topping_id: string
  public donut_name: string
  public topping_name: string
  public donut_price: number
  public topping_price: number
  public picture: string
}
