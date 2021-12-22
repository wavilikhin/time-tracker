import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { Task } from 'App/Models'
import { formatTimeCost } from 'Utils/formatTimeCost'

const tasks: Task[] = [
  {
    name: 'Task 1',
    description: 'Task 1 description',
    timeCost: formatTimeCost({ hours: 1, minutes: 20 }),
    isBillable: true,
    billRatio: 1000,
    currency: 'rub',
    tags: ['test', 'task1'],
  },
  {
    name: 'Task 2',
    description: 'Task 2 description',
    timeCost: formatTimeCost({ hours: 1, minutes: 20 }),
    isBillable: true,
    billRatio: 2400,
    currency: 'rub',
    tags: ['test', 'task2'],
  },
  {
    name: 'Task 3',
    description: 'Task 3 description',
    timeCost: formatTimeCost({ hours: 1, minutes: 20 }),
    isBillable: true,
    billRatio: 20,
    currency: 'usd',
    tags: ['test', 'task3'],
  },
  {
    name: 'Task 4',
    description: 'Task 4 description',
    timeCost: formatTimeCost({ hours: 1, minutes: 20 }),
    isBillable: true,
    billRatio: 1400,
    currency: 'rub',
    tags: ['test', 'task4'],
  },
  {
    name: 'Task 5',
    description: 'Task 5 description',
    timeCost: formatTimeCost({ hours: 1, minutes: 20 }),
    isBillable: false,
    tags: ['test', 'task5'],
  },
]

export default class TaskSeeder extends BaseSeeder {
  public static developmentOnly = true

  public async run() {
    await Task.createMany(tasks)
  }
}
