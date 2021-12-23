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

  test('[POST /] returns 422 on duplicate email', async (assert) => {
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

  test('[POST /] returns 422 on invalid input', async (assert) => {
    const sampleUser1 = {
      name: 'Sample',
      password: 'sample123',
    }

    const sampleUser2 = {
      email: 'example@mail.com',
      password: 'sample123',
    }

    const sampleUser3 = {
      name: 'Sample',
      email: 'example@mail.com',
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

  test('[GET /:id] works as expected', async (assert) => {
    // REFACTOR:
    // [] - Maybe we should create UUIDs for each entity and use them here
    const { body: users } = await supertest(BASE_URL)
      .get('/users')
      .set('Accept', 'application/json')
      .expect(200)

    const id = users[0].id

    const { body: user } = await supertest(BASE_URL)
      .get(`/users/${id}`)
      .set('Accept', 'application/json')
      .expect(200)

    assert.deepEqual(users[0], user)
  })

  test("[GET /:id] returns 404 if user doesn't exists", async () => {
    const id = 666

    await supertest(BASE_URL).get(`/users/${id}`).set('Accept', 'application/json').expect(404)
  })

  // TODO: should return 422, take a look at validator
  test('[GET /:id] returns 500 on invalid input', async () => {
    const id = 'fff'

    await supertest(BASE_URL).get(`/users/${id}`).set('Accept', 'application/json').expect(500)
  })
  // update
  // test('[PATCH /] works as expected', async (assert) => {
  //   const updateUserData = {
  //     email: 'updated@mail.com',
  //     name: 'updatedName',
  //     password: 'updatePassword',
  //   }

  //   const { body: users } = await supertest(BASE_URL)
  //     .get('/users')
  //     .set('Accept', 'application/json')
  //     .expect(200)

  //   const id = users[0].id

  //   const { body: updatedUser } = await supertest(BASE_URL)
  //     .patch('/users')
  //     .send(updateUserData)
  //     .set('Accept', 'application/json')
  //     .expect(200)

  //   // console.log('[ID]: ', updatedUser.id)
  //   // // REFACTOR
  //   // const { body: updatedUserFromDb } = await supertest(BASE_URL)
  //   //   .get(`/users/${(updatedUser as any).id}`)
  //   //   .set('Accept', 'application/json')
  //   //   .expect(200)

  //   // assert.deepEqual(updatedUser, updatedUserFromDb)
  // })
  // invalid input - 500
  // not found - 404
  // cant merge - 500

  // destroy

  group.afterEach(async () => {
    await Database.rollbackGlobalTransaction()
  })
})
