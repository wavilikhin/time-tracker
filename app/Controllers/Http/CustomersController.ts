import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateCustomerValidator from 'App/Validators/CreateCustomerValidator'
import { Customer } from '../../Models'

export default class CustomersController {
  public async index() {
    return Customer.all()
  }

  public async store({ request, response }: HttpContextContract) {
    await request.validate(CreateCustomerValidator)

    const { name } = request.body()

    response.status(201)

    return Customer.create({ name })
  }

  public async show({ request, response }: HttpContextContract) {
    const { id } = request.params()

    try {
      return Customer.findByOrFail('customer_id', id)
    } catch (error) {
      return response.notFound()
    }
  }

  public async update({ request, response }: HttpContextContract) {
    const { id } = request.params()

    let customer: Customer
    try {
      customer = await Customer.findByOrFail('user_id', id)
    } catch (error) {
      return response.notFound()
    }
  }

  public async destroy({ request, response }: HttpContextContract) {
    const { id } = request.params()

    let customer: Customer

    try {
      customer = await Customer.findByOrFail('customer_id', id)
    } catch (error) {
      return response.status(404)
    }

    try {
      return customer.delete()
    } catch (error) {
      return response.internalServerError()
    }
  }
}
