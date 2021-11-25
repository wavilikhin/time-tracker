import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CreateProjectCustomerTables extends BaseSchema {
  protected tableName = 'project_customer_table'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('project_id').unsigned().references('id').inTable('projects')
      table.integer('customer_id').unsigned().references('id').inTable('customers')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
