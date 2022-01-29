import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateUserValidator from 'App/Validators/CreateUserValidator'
import { getUserByIdValidator } from 'App/Validators/GetUserByIdValidator'
import { User } from '../../Models'

export default class ProjectsController {
  public async index() {
    return User.all()
  }

  public async store({ request, response }: HttpContextContract) {
    await request.validate(CreateUserValidator)

    const { name, email, password } = request.body()

    response.status(201)

    return User.create({
      name,
      email,
      password,
    })
  }

  public async show({ request, response }: HttpContextContract) {
    await getUserByIdValidator(request)

    const { id } = request.params()

    try {
      return User.findByOrFail('user_id', id)
    } catch (error) {
      return response.notFound()
    }
  }

  public async destroy({ request, response }: HttpContextContract) {
    const { id } = request.params()

    let user: User

    try {
      user = await User.findByOrFail('user_id', id)
    } catch (error) {
      return response.status(404)
    }

    try {
      return user.delete()
    } catch (error) {
      return response.internalServerError()
    }
  }
}
