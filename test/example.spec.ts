import test from 'japa'
import supertest from 'supertest'
import { User } from 'App/Models'
import Database from '@ioc:Adonis/Lucid/Database'
import { UserFactory } from 'Database/factories'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

const TOTAL_USERS_COUNT = 6
const fakeUsers = [
  {
    name: 'John',
    email: 'foo@example.com',
    password: '12345',
  },
  {
    name: 'Ann',
    email: 'bar@example.com',
    password: 'asdfg',
  },
  {
    name: 'Ted',
    email: 'baz@example.com',
    password: '12dasf',
  },
  {
    name: 'Swam',
    email: 'foobar@example.com',
    password: 'dals01',
  },
]

test.group('/users', (group) => {
  group.beforeEach(async () => {
    await Database.beginGlobalTransaction()

    await UserFactory.merge(fakeUsers).createMany(6)
  })

  test('[GET /] works as expected', async (assert) => {
    const { body: users } = await supertest(BASE_URL).get('/users').expect(200)

    assert.equal(users.length, TOTAL_USERS_COUNT)

    fakeUsers.forEach((user) => {
      assert.equal(
        users.some((u) => u.email === user.email),
        true
      )
    })

    assert.equal(
      users.some((u) => u.email === 'doesNotexist'),
      false
    )
  })

  test('[POST /] works as expected', async (assert) => {
    const sampleUser = {
      name: 'Sample',
      email: 'sample@mail.com',
      password: 'sample123',
    }

    const { body: createdUser } = await supertest(BASE_URL)
      .post('/users')
      .send(sampleUser)
      .set('Accept', 'application/json')
      .expect(201)

    assert.equal(createdUser.email, sampleUser.email)
  })

  test("[POST /] can't create user with the same email twice", async (assert) => {
    const sampleUser = {
      name: 'Sample',
      email: 'sample@mail.com',
      password: 'sample123',
    }

    const { body: createdUser } = await supertest(BASE_URL)
      .post('/users')
      .send(sampleUser)
      .set('Accept', 'application/json')
      .expect(201)

    assert.equal(createdUser.email, sampleUser.email)

    const req = await supertest(BASE_URL)
      .post('/users')
      .send(sampleUser)
      .set('Accept', 'application/json')
      .expect(422)

    // REFACTOR:
    // @ts-ignore
    assert.equal(JSON.parse(req.error.text).errors[0].message, 'This email already exists')
  })

  test("[POST /] can't create user without required fields", async (assert) => {
    const sampleUser1 = {
      name: 'Sample',
      password: 'sample123',
    }

    const sampleUser2 = {
      email: 'sample@mail.com',
      password: 'sample123',
    }

    const sampleUser3 = {
      name: 'Sample',
      email: 'sample@mail.com',
    }

    const failedReq1 = await supertest(BASE_URL)
      .post('/users')
      .send(sampleUser1)
      .set('Accept', 'application/json')
      .expect(422)

    // REFACTOR:
    assert.equal(
      // @ts-ignore
      JSON.parse(failedReq1.error.text).errors[0].message,
      'The email is required to create a new user'
    )

    const failedReq2 = await supertest(BASE_URL)
      .post('/users')
      .send(sampleUser2)
      .set('Accept', 'application/json')
      .expect(422)

    // REFACTOR:
    assert.equal(
      // @ts-ignore
      JSON.parse(failedReq2.error.text).errors[0].message,
      'The name is required to create a new user'
    )

    const failedReq3 = await supertest(BASE_URL)
      .post('/users')
      .send(sampleUser3)
      .set('Accept', 'application/json')
      .expect(422)

    // REFACTOR:
    assert.equal(
      // @ts-ignore
      JSON.parse(failedReq3.error.text).errors[0].message,
      'The password is required to create a new user'
    )
  })

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
