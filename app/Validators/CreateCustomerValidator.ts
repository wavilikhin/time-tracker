import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateCustomerValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({ trim: true }, [rules.alpha(), rules.required()]),
  })

  public messages = {
    'required': '{{ field }} is required to create a new customer',
    'name.alpha': "Customer's name is invalid",
    'name.string': "Customer's name should be a valid string",
  }
}
