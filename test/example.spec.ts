import test from 'japa'
import supertest from 'supertest'
import { User } from 'App/Models'
import Database from '@ioc:Adonis/Lucid/Database'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('Welcome', (group) => {
  group.beforeEach(async () => {
    await Database.beginGlobalTransaction()
  })

  // index
  test()
  // store

  // show

  // update

  // destroy

  // test('ensure home page works', async () => {
  //   await supertest(BASE_URL).get('/').expect(404)
  // })

  // test('ensure user password gets hashed during save', async (assert) => {
  //   const user = new User()
  //   user.email = 'virk@adonisjs.com'
  //   user.password = 'secret'
  //   await user.save()

  //   assert.notEqual(user.password, 'secret')
  // })

  group.afterEach(async () => {
    await Database.rollbackGlobalTransaction()
  })
})
