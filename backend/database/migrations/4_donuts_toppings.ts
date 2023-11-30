import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'donuts_toppings'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('donut_id').notNullable().references('id').inTable('donuts')
      table.string('topping_id').notNullable().references('id').inTable('toppings')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
