import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Customer, Project, User } from '../../Models'

export default class ProjectsController {
  public async index() {
    return Project.all()
  }

  public async store({ request, response }: HttpContextContract) {
    const { name } = request.body()

    const user = await User.findOrFail(1)
    const customer = await Customer.findOrFail(1)

    const project = await Project.create({
      name,
    })

    await project.related('user').attach([user.id])
    await project.related('customer').associate(customer)

    return response.json(project)
  }

  // store
  // show
  // update
  // destroy
}
