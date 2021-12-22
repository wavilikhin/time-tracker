import { DateTime } from 'luxon'
import {
  BaseModel,
  column,
  hasMany,
  HasMany,
  // HasManyThrough,
  // hasManyThrough,
} from '@ioc:Adonis/Lucid/Orm'
import Project from './Project'
// import { Task } from '.'

export default class Customer extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Project, {
    foreignKey: 'id',
  })
  public projects: HasMany<typeof Project>

  // @hasManyThrough([() => Task, () => Project])
  // public tasks: HasManyThrough<typeof Task>
}
