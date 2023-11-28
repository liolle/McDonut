/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

export class Donuts {
  id: string
  name: string
  price: number
  toppings: Toppings[]
  picture: string
}

export class Toppings {
  id: string
  name: string
  price: number
}

const TOPPINGS: Toppings[] = [
  {
    id: 'T_topping1_00', //0
    name: 'chocolate sprinkle',
    price: 0.25,
  },
  {
    id: 'T_CHO_00', //1
    name: 'chocolate filling',
    price: 0.25,
  },
  {
    id: 'T_CHO_01', //2
    name: 'chocolate icing',
    price: 0.25,
  },
  {
    id: 'T_CHO_02', //3
    name: 'chocolate drizzle',
    price: 0.25,
  },
  {
    id: 'T_CHO_03', //4
    name: 'dark chocolate sprinkle',
    price: 0.25,
  },
  {
    id: 'T_CHO_04', //5
    name: 'dark chocolate icing',
    price: 0.25,
  },
  {
    id: 'T_VAN_00', //6
    name: 'vanilla icing',
    price: 0.25,
  },
  {
    id: 'T_VAN_01', //7
    name: 'vanilla filling',
    price: 0.25,
  },
  {
    id: 'T_VAN_02', //8
    name: 'vanilla drizzle',
    price: 0.25,
  },
  {
    id: 'T_CAR_00', //9
    name: 'caramel drizzle',
    price: 0.25,
  },
  {
    id: 'T_NUT_00', //10
    name: 'nut',
    price: 0.25,
  },
  {
    id: 'T_NUT_01', //11
    name: 'coconut sprinkle',
    price: 0.25,
  },
]

export const DONUTS: Donuts[] = [
  {
    id: 'DI_CHO_01',
    name: 'choco delight',
    toppings: [TOPPINGS[0], TOPPINGS[2]],
    price: 1.75,
    picture: 'https://d22f1kls6ex9ii.cloudfront.net/donuts/donut_1.png',
  },
  {
    id: 'DI_CHO_02',
    name: 'dual swirl',
    toppings: [TOPPINGS[8], TOPPINGS[3]],
    price: 1.5,
    picture: 'https://d22f1kls6ex9ii.cloudfront.net/donuts/donut_2.png',
  },
  {
    id: 'DI_CHO_03',
    name: 'caramel crunch ',
    toppings: [TOPPINGS[6], TOPPINGS[9], TOPPINGS[10]],
    price: 2.0,
    picture: 'https://d22f1kls6ex9ii.cloudfront.net/donuts/donut_3.png',
  },
  {
    id: 'DI_CHO_04',
    name: 'dark lava',
    toppings: [TOPPINGS[4], TOPPINGS[5]],
    price: 1.75,
    picture: 'https://d22f1kls6ex9ii.cloudfront.net/donuts/donut_4.png',
  },
  {
    id: 'DI_VAN_01',
    name: 'choco drizzle',
    toppings: [TOPPINGS[3], TOPPINGS[6]],
    price: 1.5,
    picture: 'https://d22f1kls6ex9ii.cloudfront.net/donuts/donut_5.png',
  },
  {
    id: 'DI_CHO_05',
    name: 'choco heaven',
    toppings: [TOPPINGS[0], TOPPINGS[1], TOPPINGS[2]],
    price: 1.5,
    picture: 'https://d22f1kls6ex9ii.cloudfront.net/donuts/donut_6.png',
  },
  {
    id: 'DI_VAN_02',
    name: 'choco drift',
    toppings: [TOPPINGS[6], TOPPINGS[0], TOPPINGS[3]],
    price: 2.0,
    picture: 'https://d22f1kls6ex9ii.cloudfront.net/donuts/donut_7.png',
  },
  {
    id: 'DI_CHO_06',
    name: 'dark elegance',
    toppings: [TOPPINGS[4], TOPPINGS[2], TOPPINGS[7]],
    price: 1.75,
    picture: 'https://d22f1kls6ex9ii.cloudfront.net/donuts/donut_8.png',
  },
  {
    id: 'DI_CHO_07',
    name: 'vanilla coconut',
    toppings: [TOPPINGS[11], TOPPINGS[7], TOPPINGS[6]],
    price: 2.25,
    picture: 'https://d22f1kls6ex9ii.cloudfront.net/donuts/donut_9.png',
  },
]

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.get('/donuts', async () => {
  return { donuts: DONUTS }
})
