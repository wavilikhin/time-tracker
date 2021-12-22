import { RequestContract } from '@ioc:Adonis/Core/Request'
import { validator, schema, rules } from '@ioc:Adonis/Core/Validator'

export const deleteUserByIdValidator = async (req: RequestContract) => {
  await validator.validate({
    schema: schema.create({
      id: schema.string({}, [rules.required(), rules.maxLength(0)]),
    }),
    data: {
      id: req.params().id,
    },
    messages: {
      'id.required': 'Id is required',
      'id.maxLength': 'Id is invalid',
    },
  })
}
