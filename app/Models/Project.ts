import { DateTime } from 'luxon'
import {
  BaseModel,
  column,
  hasMany,
  HasMany,
  belongsTo,
  BelongsTo,
  manyToMany,
  ManyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import Customer from './Customer'
import { Task, User } from '.'

export default class Project extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Customer, {
    foreignKey: 'id',
  })
  public customer: BelongsTo<typeof Customer>

  @manyToMany(() => User, {
    pivotTable: 'project_users',
  })
  public user: ManyToMany<typeof User>

  @hasMany(() => Task)
  public tasks: HasMany<typeof Task>
}
