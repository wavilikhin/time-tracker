import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateUserValidator from 'App/Validators/CreateUserValidator'
import { deleteUserByIdValidator } from 'App/Validators/DeleteUserByIdValidator'
import { getUserByIdValidator } from 'App/Validators/GetUserByIdValidator'
import UpdateUserValidator from 'App/Validators/UpdateUserValidator'
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
      return User.findOrFail(id)
    } catch (error) {
      return response.notFound()
    }
  }

  public async update({ request, response }: HttpContextContract) {
    await request.validate(UpdateUserValidator)

    const { name, email, password } = request.body()

    let user: User
    try {
      user = await User.findByOrFail('email', email)
    } catch (error) {
      return response.status(404)
    }

    try {
      user.merge({
        name: name ? name : user.name,
        password,
      })

      return user.save()
    } catch (error) {
      return response.internalServerError()
    }
  }

  public async destroy({ request, response }: HttpContextContract) {
    await deleteUserByIdValidator(request)

    const { id } = request.params()

    let user: User

    try {
      user = await User.findOrFail(id)
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
