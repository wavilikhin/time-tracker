import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Customer } from '../../Models'

export default class CustomersController {
  public async index() {
    return Customer.all()
  }

  public async store({ request, response }: HttpContextContract) {
    const { name } = request.body()

    const customer = await Customer.create({ name })

    return response.json(customer)
  }
  // store
  // show
  // update
  // destroy
}
