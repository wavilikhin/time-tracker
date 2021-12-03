import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Project } from '../../Models'

export default class ProjectsController {
  public async index() {
    return Project.all()
  }

  public async store({ request }: HttpContextContract) {
    const { name } = request.body()

    return Project.create({
      name,
    })
  }

  // store
  // show
  // update
  // destroy
}
