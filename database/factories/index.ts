import Factory from '@ioc:Adonis/Lucid/Factory'
import { Customer, Project, Task, User } from 'App/Models'
import { Duration } from 'luxon'

export const UserFactory = Factory.define(User, ({ faker }) => {
  return {
    name: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  }
})
  .relation('projects', () => ProjectFactory)
  .relation('tasks', () => TaskFactory)
  .build()

export const CustomerFactory = Factory.define(Customer, ({ faker }) => {
  return {
    name: faker.internet.userName(),
  }
})
  .relation('projects', () => ProjectFactory)
  .build()

export const ProjectFactory = Factory.define(Project, ({ faker }) => {
  return {
    name: faker.random.word(),
  }
})
  .relation('customer', () => CustomerFactory)
  .relation('user', () => UserFactory)
  .relation('tasks', () => TaskFactory)
  .build()

export const TaskFactory = Factory.define(Task, ({ faker }) => {
  return {
    name: faker.lorem.word(15),
    description: faker.lorem.word(35),
    timeCost: Duration.fromObject({
      hour: faker.datatype.number(12),
      minutes: faker.datatype.number(59),
    }).toISOTime(),
    isBillable: faker.datatype.boolean(),
    tags: [faker.random.word(), faker.random.word()],
  }
})
  .relation('project', () => ProjectFactory)
  .relation('user', () => UserFactory)
  .build()
