import test from 'japa'
import supertest from 'supertest'
import Database from '@ioc:Adonis/Lucid/Database'
import { CustomerFactory } from 'Database/factories'
import { nanoid } from 'nanoid/non-secure'
import { getResponseErrors } from './utils/getResponseErrors'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

const TOTAL_CUSTOMERS_COUNT = 2

const fakeIds = [nanoid(), nanoid()]
const fakeCustomers = [
  {
    name: 'My mom',
    customerId: fakeIds[0],
  },
  {
    name: 'Dunder Mifflin',
    customerId: fakeIds[1],
  },
]

test.group('/customers', (group) => {
  group.beforeEach(async () => {
    await Database.beginGlobalTransaction()

    await CustomerFactory.merge(fakeCustomers).createMany(TOTAL_CUSTOMERS_COUNT)
  })

  test('[GET /] works as expected', async (assert) => {
    const { body: customers } = await supertest(BASE_URL).get('/customers').expect(200)

    assert.equal(customers.length, TOTAL_CUSTOMERS_COUNT)

    fakeCustomers.forEach((customer) => {
      assert.equal(
        customers.some((c) => c.name === customer.name),
        true
      )
    })
  })

  test('[POST /] works as expected', async (assert) => {
    const sampleCustomer = {
      name: 'Sample',
    }

    const { body: createdCustomer } = await supertest(BASE_URL)
      .post('/customers')
      .send(sampleCustomer)
      .set('Accept', 'application/json')
      .expect(201)

    assert.equal(createdCustomer.name, sampleCustomer.name)
  })

  test('[POST /] returns 422 on inavlaid name type', async (assert) => {
    const sampleCustomer = {
      name: 123,
    }

    const req = await supertest(BASE_URL)
      .post('/customers')
      .send(sampleCustomer)
      .set('Accept', 'application/json')
      .expect(422)

    const errors = getResponseErrors(req)

    assert.equal(errors[0].message, "Customer's name should be a valid string")
  })

  test('[POST /] returns 422 if name in not provided', async (assert) => {
    const sampleCustomer = {}

    const req = await supertest(BASE_URL)
      .post('/customers')
      .send(sampleCustomer)
      .set('Accept', 'application/json')
      .expect(422)

    const errors = getResponseErrors(req)
    assert.equal(errors[0].message, 'name is required to create a new customer')
  })

  test('[POST /] returns 422 if no email provided', async (assert) => {
    const sampleCustomer = {}

    const req = await supertest(BASE_URL)
      .post('/customers')
      .send(sampleCustomer)
      .set('Accept', 'application/json')
      .expect(422)

    const errors = getResponseErrors(req)

    assert.equal(errors[0].message, 'name is required to create a new customer')
  })

  test('[GET /:id] works as expected', async (assert) => {
    const { body: customer } = await supertest(BASE_URL)
      .get(`/customers/${fakeIds[0]}`)
      .set('Accept', 'application/json')
      .expect(200)

    assert.equal(customer.name, fakeCustomers[0].name)
  })

  test("[GET /:id] returns 404 if customer doesn't exists", async () => {
    const id = 666

    await supertest(BASE_URL).get(`/customers/${id}`).set('Accept', 'application/json').expect(404)
  })

  test('[DELETE /:id] works as expected', async () => {
    await supertest(BASE_URL)
      .delete(`/customers/${fakeIds[0]}`)
      .set('Accept', 'application/json')
      .expect(200)

    await supertest(BASE_URL)
      .get(`/customers/${fakeIds[0]}`)
      .set('Accept', 'application/json')
      .expect(404)
  })

  test('[DELETE /:id] returns 404 if customer not found', async () => {
    await supertest(BASE_URL)
      .delete(`/customers/${12345}`)
      .set('Accept', 'application/json')
      .expect(404)
  })

  group.afterEach(async () => {
    await Database.rollbackGlobalTransaction()
  })
})
