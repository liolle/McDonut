import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'donuts_historics'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('user_id').primary().notNullable().references('id').inTable('users')
      table.uuid('historic_id').primary().notNullable().references('id').inTable('historics')
      table.string('donut_id').primary().notNullable().references('id').inTable('donuts')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
