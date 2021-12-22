import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import { Project, User } from '.'

export default class Task extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @column()
  public description?: string

  @column()
  public timeCost: string

  @column()
  public isBillable?: boolean

  @column()
  public billRatio?: number

  @column()
  public currency: 'rub' | 'usd' | 'eur' = 'rub'

  @column()
  public tags?: string[]

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User, {
    foreignKey: 'id',
  })
  public user: BelongsTo<typeof User>

  @belongsTo(() => Project, {
    foreignKey: 'id',
  })
  public project: BelongsTo<typeof Project>
}
