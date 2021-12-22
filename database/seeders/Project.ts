import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { Project } from 'App/Models'

export default class ProjectSeeder extends BaseSeeder {
  public static developmentOnly = true
  public async run() {
    await Project.updateOrCreateMany('name', [
      {
        name: 'Project 1',
      },
      {
        name: 'Project 2',
      },
      {
        name: 'Project 3',
      },
    ])
  }
}
