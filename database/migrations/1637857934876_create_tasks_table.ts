import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CreateTasksTables extends BaseSchema {
  protected tableName = 'tasks'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').unsigned().primary()
      table.string('name', 50).notNullable()
      table.text('description').nullable()
      table.string('time_cost').notNullable()
      table.boolean('is_billable').nullable().defaultTo(false)
      table.integer('bill_ratio').nullable().defaultTo(0)
      table.string('currency').nullable().defaultTo('rubles')
      table.string('tags').nullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
