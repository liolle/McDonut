import BaseSchema from '@ioc:Adonis/Lucid/Schema'

interface ProductList {
  productName: string
  productId: string
  priceId: string
}

export default class extends BaseSchema {
  public async up() {
    await this.raw(`ALTER TABLE donuts ADD stripe_prod_id VARCHAR(255)  `)
    await this.raw(`ALTER TABLE donuts ADD stripe_price_id VARCHAR(255)  `)

    await this.setProductId([
      {
        priceId: 'price_1OL4ZjICDGrb7btWA0Awvhgv',
        productId: 'prod_P9NK6tOGTChoph',
        productName: 'vanilla coconut',
      },
      {
        priceId: 'price_1OL4XvICDGrb7btW4faTjyWD',
        productId: 'prod_P9NHpCkeBc3aFW',
        productName: 'dark elegance',
      },
      {
        priceId: 'price_1OL4VnICDGrb7btWd506QciM',
        productId: 'prod_P9NGhnwBjuf1YX',
        productName: 'choco drift',
      },
      {
        priceId: 'price_1OL4UZICDGrb7btWpKpXoJCb',
        productId: 'prod_P9NFfzPtuflSaF',
        productName: 'choco heaven',
      },
      {
        priceId: 'price_1OL4SnICDGrb7btWs91maDma',
        productId: 'prod_P9NBTAD0Uxl2Ki',
        productName: 'choco drizzle',
      },
      {
        priceId: 'price_1OL4PlICDGrb7btWnliRHKTf',
        productId: 'prod_P9N7VFYAvW6chw',
        productName: 'dark lava',
      },
      {
        priceId: 'price_1OL4ORICDGrb7btW5zxCOr1X',
        productId: 'prod_P9N5aYdRammNLj',
        productName: 'caramel crunch',
      },
      {
        priceId: 'price_1OL4CUICDGrb7btWSUlr6nOe',
        productId: 'prod_P9MwdcBWSnbQld',
        productName: 'dual swirl',
      },
      {
        priceId: 'price_1OL3suICDGrb7btWu7Iv0Qj5',
        productId: 'prod_P9McbuHP0mddHD',
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
          product.productId,
          product.priceId,
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
