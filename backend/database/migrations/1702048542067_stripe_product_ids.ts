import BaseSchema from '@ioc:Adonis/Lucid/Schema'

interface ProductList {
  productName: string
  product_id: string
  price_id: string
}

export default class extends BaseSchema {
  public async up() {
    await this.raw(`ALTER TABLE donuts ADD stripe_prod_id VARCHAR(255)  `)
    await this.raw(`ALTER TABLE donuts ADD stripe_price_id VARCHAR(255)  `)

    await this.setProductId([
      {
        price_id: 'price_1OL4ZjICDGrb7btWA0Awvhgv',
        product_id: 'prod_P9NK6tOGTChoph',
        productName: 'vanilla coconut',
      },
      {
        price_id: 'price_1OL4XvICDGrb7btW4faTjyWD',
        product_id: 'prod_P9NHpCkeBc3aFW',
        productName: 'dark elegance',
      },
      {
        price_id: 'price_1OL4VnICDGrb7btWd506QciM',
        product_id: 'prod_P9NGhnwBjuf1YX',
        productName: 'choco drift',
      },
      {
        price_id: 'price_1OL4UZICDGrb7btWpKpXoJCb',
        product_id: 'prod_P9NFfzPtuflSaF',
        productName: 'choco heaven',
      },
      {
        price_id: 'price_1OL4SnICDGrb7btWs91maDma',
        product_id: 'prod_P9NBTAD0Uxl2Ki',
        productName: 'choco drizzle',
      },
      {
        price_id: 'price_1OL4PlICDGrb7btWnliRHKTf',
        product_id: 'prod_P9N7VFYAvW6chw',
        productName: 'dark lava',
      },
      {
        price_id: 'price_1OL4ORICDGrb7btW5zxCOr1X',
        product_id: 'prod_P9N5aYdRammNLj',
        productName: 'caramel crunch',
      },
      {
        price_id: 'price_1OL4CUICDGrb7btWSUlr6nOe',
        product_id: 'prod_P9MwdcBWSnbQld',
        productName: 'dual swirl',
      },
      {
        price_id: 'price_1OL3suICDGrb7btWu7Iv0Qj5',
        product_id: 'prod_P9McbuHP0mddHD',
        productName: 'choco delight',
      },
    ])

    await this.raw(
      `ALTER TABLE donuts ALTER COLUMN stripe_prod_id TYPE VARCHAR(255), ALTER COLUMN stripe_prod_id SET NOT NULL`
    )
    await this.raw(
      `ALTER TABLE donuts ALTER COLUMN stripe_price_id TYPE VARCHAR(255), ALTER COLUMN stripe_price_id SET NOT NULL`
    )
  }

  private async setProductId(productList: ProductList[]) {
    await Promise.all(
      productList.map((product) =>
        this.raw('UPDATE donuts SET stripe_prod_id= ?, stripe_price_id= ? WHERE name = ?', [
          product.product_id,
          product.price_id,
          product.productName,
        ])
      )
    )
    return
  }

  public async down() {
    this.schema.alterTable('donuts', (table) => {
      table.dropColumn('stripe_prod_id')
      table.dropColumn('stripe_price_id')
    })
  }
}
