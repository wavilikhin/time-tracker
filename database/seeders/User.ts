import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { User } from 'App/Models'

export default class UserSeeder extends BaseSeeder {
  public static developmentOnly = true

  public async run() {
    await User.updateOrCreateMany('email', [
      {
        email: 'fake@mail.com',
        name: 'John',
        password: '12345',
      },
      {
        email: 'fake2@mail.com',
        name: 'Alice',
        password: '54321',
      },
      {
        email: 'fake3@mail.com',
        name: 'Ted',
        password: '6473424',
      },
      {
        email: 'fake4@mail.com',
        name: 'Bob',
        password: '264352',
      },
      {
        email: 'fake5@mail.com',
        name: 'Martin',
        password: '92318491324',
      },
    ])
  }
}
