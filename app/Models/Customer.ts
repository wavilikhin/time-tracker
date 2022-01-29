import { DateTime } from 'luxon'
import { nanoid } from 'nanoid/non-secure'
import { BaseModel, beforeSave, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Project from './Project'

export default class Customer extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public customerId?: string

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

  @beforeSave()
  public static async generateCustomerId(customer: Customer) {
    if (!customer.customerId) {
      customer.customerId = nanoid()
    }
  }
}
