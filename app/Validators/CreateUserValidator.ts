import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({ trim: true }, [rules.alpha(), rules.required()]),
    email: schema.string({ trim: true }, [
      rules.required(),
      rules.email(),
      rules.unique({ table: 'users', column: 'email' }),
    ]),
    password: schema.string({ trim: true }, [rules.required()]),
  })

  public messages = {
    'required': 'The {{ field }} is required to create a new user',
    'name.alpha': 'Username is invalid',
    'email.email': 'Email is invalid',
    'email.unique': 'This email already exists',
  }
}
