import test from 'japa'
import supertest from 'supertest'
import Database from '@ioc:Adonis/Lucid/Database'
import { UserFactory } from 'Database/factories'
import { nanoid } from 'nanoid/non-secure'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

const TOTAL_USERS_COUNT = 3

const fakeIds = [nanoid(), nanoid()]
const fakeUsers = [
  {
    name: 'John',
    userId: fakeIds[0],
    email: 'foo@example.com',
    password: '12345',
  },
  {
    name: 'Ann',
    userId: fakeIds[1],
    email: 'bar@example.com',
    password: 'asdfg',
  },
]

test.group('/users', (group) => {
  group.beforeEach(async () => {
    await Database.beginGlobalTransaction()

    await UserFactory.merge(fakeUsers).createMany(TOTAL_USERS_COUNT)
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

  test('[POST /] returns 422 on duplicate email', async (assert) => {
    const sampleUser = {
      name: 'Sample',
      email: 'sample@mail.com',
      password: 'sample123',
    }

    await supertest(BASE_URL)
      .post('/users')
      .send(sampleUser)
      .set('Accept', 'application/json')
      .expect(201)

    const req = await supertest(BASE_URL)
      .post('/users')
      .send(sampleUser)
      .set('Accept', 'application/json')
      .expect(422)

    // REFACTOR:
    // @ts-ignore
    assert.equal(JSON.parse(req.error.text).errors[0].message, 'This email already exists')
  })

  test('[POST /] returns 422 if no email provided', async (assert) => {
    const sampleUser1 = {
      name: 'Sample',
      password: 'sample123',
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
  })

  test('[POST /] returns 422 if name in not provided', async (assert) => {
    const sampleUser2 = {
      email: 'example@mail.com',
      password: 'sample123',
    }

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
  })

  test('[POST /] returns 422 if password not provided', async (assert) => {
    const sampleUser3 = {
      name: 'Sample',
      email: 'example@mail.com',
    }

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

  test('[GET /:id] works as expected', async (assert) => {
    const { body: user } = await supertest(BASE_URL)
      .get(`/users/${fakeIds[0]}`)
      .set('Accept', 'application/json')
      .expect(200)

    assert.equal(user.email, fakeUsers[0].email)
    assert.equal(user.name, fakeUsers[0].name)
  })

  test("[GET /:id] returns 404 if user doesn't exists", async () => {
    const id = 666

    await supertest(BASE_URL).get(`/users/${id}`).set('Accept', 'application/json').expect(404)
  })

  test('[DELETE /:id] works as expected', async () => {
    await supertest(BASE_URL)
      .delete(`/users/${fakeIds[0]}`)
      .set('Accept', 'application/json')
      .expect(200)

    await supertest(BASE_URL)
      .get(`/users/${fakeIds[0]}`)
      .set('Accept', 'application/json')
      .expect(404)
  })

  test('[DELETE /:id] returns 404 if user not found', async () => {
    await supertest(BASE_URL)
      .delete(`/users/${12345}`)
      .set('Accept', 'application/json')
      .expect(404)
  })

  group.afterEach(async () => {
    await Database.rollbackGlobalTransaction()
  })
})
