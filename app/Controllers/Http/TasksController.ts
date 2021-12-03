import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Task } from '../../Models'
import { formatTimeCost } from '../../../utils/formatTimeCost'

export default class TasksController {
  public async index() {
    return Task.all()
  }

  public async store({ request, response }: HttpContextContract) {
    const { name, description, timeCost, isBillable, billRatio, currency, tags } = request.body()

    console.log(
      name,
      description,
      timeCost,
      formatTimeCost(timeCost),
      isBillable,
      billRatio,
      currency,
      tags
    )

    const task = await Task.create({
      name,
      description,
      timeCost: formatTimeCost(timeCost),
      isBillable,
      billRatio,
      currency,
      tags,
    })

    response.json(task)
  }

  // show
  // update
  // destroy
}
