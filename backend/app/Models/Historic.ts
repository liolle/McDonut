import { BaseModel, HasOne, beforeCreate, column, hasOne } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import User from './User'
import { IdGenerator } from '../class/idGenerator'

export default class Historic extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @beforeCreate()
  public static async setID(historic: Historic) {
    historic.id = IdGenerator.generate(IdGenerator.HISTORIC_ID)
  }

  @hasOne(() => User)
  public user: HasOne<typeof User>
}
