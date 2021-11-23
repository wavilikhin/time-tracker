// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Task from 'App/Models/Task'
// import Customer from 'App/Models/Customer'
// import Project from 'App/Models/Project'

export default class TasksController {
  public async index() {
    return Task.all()
  }
  // store
  // show
  // update
  // destroy
}
