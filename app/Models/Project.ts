import { DateTime } from 'luxon'
import { nanoid } from 'nanoid/non-secure'
import {
  BaseModel,
  column,
  hasMany,
  HasMany,
  belongsTo,
  BelongsTo,
  beforeSave,
} from '@ioc:Adonis/Lucid/Orm'
import Customer from './Customer'
import { Task, User } from '.'

export default class Project extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public projectId?: string

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

  @belongsTo(() => User, {
    foreignKey: 'id',
  })
  public user: BelongsTo<typeof User>

  @hasMany(() => Task, {
    foreignKey: 'id',
  })
  public tasks: HasMany<typeof Task>

  @beforeSave()
  public static async generateProjectId(project: Project) {
    if (!project.projectId) {
      project.projectId = nanoid()
    }
  }
}
