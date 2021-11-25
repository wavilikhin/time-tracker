import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CreateProjectTasksTables extends BaseSchema {
  protected tableName = 'project_tasks_table'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('project_id').unsigned().notNullable().references('id').inTable('projects')
      table.integer('task_id').unsigned().notNullable().references('id').inTable('tasks')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
