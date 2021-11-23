import { CustomerFactory, ProjectFactory, TaskFactory } from '../factories'
import { Customer, Project, Task } from '../../app/Models'

export class DatabaseSeeder {
  public async run() {
    const task = await TaskFactory.with('project', 1).create()

    console.log(task)
  }
}
