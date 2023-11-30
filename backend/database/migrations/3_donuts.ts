import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'donuts'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()
      table.string('name', 255).notNullable().unique()
      table.double('price', 2).notNullable()
      table.string('picture').notNullable()
      table.string('available').defaultTo(true)
      table.timestamp('updated_at').notNullable()
      table.timestamp('created_at').notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
