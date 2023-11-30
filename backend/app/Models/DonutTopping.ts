import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class DonutsTopping extends BaseModel {
  @column()
  public id: number

  @column()
  public donutId: string

  @column()
  public toppingId: string
}
