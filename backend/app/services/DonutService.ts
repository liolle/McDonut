import Database from '@ioc:Adonis/Lucid/Database'
import { Donuts, RawDonuts } from '../class/donut/donut'

interface SelectInterface {
  page: number
  limit: number
  keyword: string
}

export class DonutService {
  public static async select({ page, limit, keyword }: SelectInterface) {
    const { rows } = await Database.rawQuery(
      `
      SELECT 
      d.id as donut_id,
      d.stripe_price_id, 
      t.id as topping_id,
      d.name as donut_name, 
      t.name as topping_name, 
      d.price as donut_price, 
      t.price as topping_price, 
      picture
      FROM donuts d
      LEFT JOIN donuts_toppings dt ON dt.donut_id = d.id
      LEFT JOIN toppings t ON dt.topping_id = t.id
      WHERE EXISTS (
          SELECT 1
          FROM donuts d2
          LEFT JOIN donuts_toppings dt2 ON dt2.donut_id = d2.id
          LEFT JOIN toppings t2 ON dt2.topping_id = t2.id
          WHERE (d2.name LIKE :key OR t2.name LIKE :key ) AND d2.id = d.id
      );
    `,
      {
        key: `%${keyword || ''}%`,
      }
    )

    return this.transformRawDonuts(rows)
  }

  private static transformRawDonuts(rawDonuts: RawDonuts[]) {
    const donutMap = new Map<string, Donuts>()

    for (const dr of rawDonuts) {
      const donut = donutMap.get(dr.donut_id)
      if (!donut) {
        donutMap.set(dr.donut_id, {
          id: dr.donut_id,
          priceId: dr.stripe_price_id,
          name: dr.donut_name,
          price: dr.donut_price,
          picture: dr.picture,
          toppings: [
            {
              id: dr.topping_id,
              name: dr.topping_name,
              price: dr.topping_price,
            },
          ],
        })
      } else {
        donut.toppings.push({
          id: dr.topping_id,
          name: dr.topping_name,
          price: dr.topping_price,
        })
      }
    }
    return Array.from(donutMap.values())
  }
}
