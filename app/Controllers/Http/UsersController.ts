import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { User } from '../../Models'

export default class ProjectsController {
  public async index() {
    return User.all()
  }

  public async store({ request }: HttpContextContract) {
    const { name, email, password } = request.body()

    console.log(name, email, password)

    return User.create({
      name,
      email,
      password,
    })
  }

  // store
  // show
  // update
  // destroy
}
