import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { Customer } from 'App/Models'

export default class CustomerSeeder extends BaseSeeder {
  public static developmentOnly = true

  public async run() {
    await Customer.updateOrCreateMany('name', [
      {
        name: 'Customer 1',
      },
      {
        name: 'Customer 2',
      },
      {
        name: 'Customer 3',
      },
      {
        name: 'Customer 4',
      },
    ])
  }
}
