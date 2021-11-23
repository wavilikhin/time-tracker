import { DateTime } from 'luxon'
import { BaseModel, column, hasOne, HasOne, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Project from './Project'

export default class Task extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @belongsTo(() => Project)
  public project: BelongsTo<typeof Project>

  @column()
  public name: string

  @column()
  public description: string

  @column()
  public timeCost: string

  @column()
  public isBillable: boolean

  @column()
  public tags: string[]

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
