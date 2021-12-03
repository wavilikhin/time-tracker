import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CreateProjectUsersTables extends BaseSchema {
  protected tableName = 'user_tasks'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('task_id').unsigned().notNullable().references('id').inTable('tasks')
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
