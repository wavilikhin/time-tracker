import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { Customer } from 'App/Models'
import { nanoid } from 'nanoid/non-secure'

export default class CustomerSeeder extends BaseSeeder {
  public static developmentOnly = true

  public async run() {
    await Customer.updateOrCreateMany('name', [
      {
        name: 'Customer 1',
        customerId: nanoid(),
      },
      {
        name: 'Customer 2',
        customerId: nanoid(),
      },
      {
        name: 'Customer 3',
        customerId: nanoid(),
      },
      {
        name: 'Customer 4',
        customerId: nanoid(),
      },
    ])
  }
}
