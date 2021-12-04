import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Project, Task, User } from '../../Models'
import { formatTimeCost } from '../../../utils/formatTimeCost'

export default class TasksController {
  public async index() {
    return Task.all()
  }

  public async store({ request, response }: HttpContextContract) {
    const { name, description, timeCost, isBillable, billRatio, currency, tags } = request.body()

    const user1 = await User.findOrFail(1)
    const project = await Project.findOrFail(1)

    const task = await Task.create({
      name,
      description,
      timeCost: formatTimeCost(timeCost),
      isBillable,
      billRatio,
      currency,
      tags,
    })

    await task.related('user').attach([user1.id])
    await task.related('project').associate(project)

    return response.json(task)
  }

  // show
  // update
  // destroy
}
