import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'setup_pgs'

  public async up() {
    await this.raw('create extension IF NOT EXISTS "uuid-ossp" schema pg_catalog version "1.1";')
  }

  public async down() {}
}
