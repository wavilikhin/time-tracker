import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CreateUsersTables extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').unsigned().primary()
      table.string('name', 50).nullable()
      table.string('email', 255).notNullable().unique()
      table.string('password').notNullable().unique()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
