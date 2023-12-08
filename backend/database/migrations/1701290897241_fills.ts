import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import Donut from '../../app/Models/Donut'
import DonutsTopping from '../../app/Models/DonutTopping'
import Topping from '../../app/Models/Topping'

export default class extends BaseSchema {
  protected tableName = 'fills'

  public async up() {
    await Topping.createMany([
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
        id: 'T_CHO_05', //0
        name: 'chocolate sprinkle',
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
    ])

    await Donut.createMany([
      {
        id: 'D_CHO_01',
        name: 'choco delight',
        price: 1.75,
        picture: 'https://d22f1kls6ex9ii.cloudfront.net/donuts/donut_1.png',
      },
      {
        id: 'D_CHO_02',
        name: 'dual swirl',
        price: 1.5,
        picture: 'https://d22f1kls6ex9ii.cloudfront.net/donuts/donut_2.png',
      },
      {
        id: 'D_CHO_03',
        name: 'caramel crunch',
        price: 2.0,
        picture: 'https://d22f1kls6ex9ii.cloudfront.net/donuts/donut_3.png',
      },
      {
        id: 'D_CHO_04',
        name: 'dark lava',
        price: 1.75,
        picture: 'https://d22f1kls6ex9ii.cloudfront.net/donuts/donut_4.png',
      },
      {
        id: 'D_VAN_01',
        name: 'choco drizzle',
        price: 1.5,
        picture: 'https://d22f1kls6ex9ii.cloudfront.net/donuts/donut_5.png',
      },
      {
        id: 'D_CHO_05',
        name: 'choco heaven',
        price: 1.5,
        picture: 'https://d22f1kls6ex9ii.cloudfront.net/donuts/donut_6.png',
      },
      {
        id: 'D_VAN_02',
        name: 'choco drift',
        price: 2.0,
        picture: 'https://d22f1kls6ex9ii.cloudfront.net/donuts/donut_7.png',
      },
      {
        id: 'D_CHO_06',
        name: 'dark elegance',
        price: 1.75,
        picture: 'https://d22f1kls6ex9ii.cloudfront.net/donuts/donut_8.png',
      },
      {
        id: 'D_CHO_07',
        name: 'vanilla coconut',
        price: 2.25,
        picture: 'https://d22f1kls6ex9ii.cloudfront.net/donuts/donut_9.png',
      },
    ])

    DonutsTopping.createMany([
      { donutId: 'D_CHO_01', toppingId: 'T_CHO_05' },
      { donutId: 'D_CHO_01', toppingId: 'T_CHO_01' },
      { donutId: 'D_CHO_02', toppingId: 'T_CHO_02' },
      { donutId: 'D_CHO_02', toppingId: 'T_VAN_02' },
      { donutId: 'D_CHO_03', toppingId: 'T_VAN_00' },
      { donutId: 'D_CHO_03', toppingId: 'T_CAR_00' },
      { donutId: 'D_CHO_03', toppingId: 'T_NUT_00' },
      { donutId: 'D_CHO_04', toppingId: 'T_CHO_03' },
      { donutId: 'D_CHO_04', toppingId: 'T_CHO_04' },
      { donutId: 'D_VAN_01', toppingId: 'T_CHO_02' },
      { donutId: 'D_VAN_01', toppingId: 'T_VAN_00' },
      { donutId: 'D_CHO_05', toppingId: 'T_CHO_05' },
      { donutId: 'D_CHO_05', toppingId: 'T_CHO_00' },
      { donutId: 'D_CHO_05', toppingId: 'T_CHO_02' },
      { donutId: 'D_VAN_02', toppingId: 'T_VAN_00' },
      { donutId: 'D_VAN_02', toppingId: 'T_CHO_05' },
      { donutId: 'D_VAN_02', toppingId: 'T_CHO_02' },
      { donutId: 'D_CHO_06', toppingId: 'T_CHO_03' },
      { donutId: 'D_CHO_06', toppingId: 'T_CHO_01' },
      { donutId: 'D_CHO_06', toppingId: 'T_VAN_01' },
      { donutId: 'D_CHO_07', toppingId: 'T_NUT_01' },
      { donutId: 'D_CHO_07', toppingId: 'T_VAN_01' },
      { donutId: 'D_CHO_07', toppingId: 'T_VAN_00' },
    ])
  }

  public async down() {}
}
