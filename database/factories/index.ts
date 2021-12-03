// import Factory from '@ioc:Adonis/Lucid/Factory'
// import { Customer, Project, Task } from 'App/Models'
// import { Duration } from 'luxon'
// import { formatTimeCost } from '../../utils/formatTimeCost'

// export const CustomerFactory = Factory.define(Customer, ({ faker }) => {
//   return {
//     id: faker.datatype.uuid(),
//     name: faker.internet.userName(),
//   }
// })
//   .relation('projects', () => ProjectFactory)
//   .relation('tasks', () => TaskFactory)
//   .build()

// export const ProjectFactory = Factory.define(Project, ({ faker }) => {
//   return {
//     id: faker.datatype.uuid(),
//     name: faker.internet.userName(),
//   }
// })
//   .relation('customer', () => CustomerFactory)
//   .build()

// export const TaskFactory = Factory.define(Task, ({ faker }) => {
//   return {
//     id: faker.datatype.uuid(),
//     name: faker.lorem.word(15),
//     description: faker.lorem.word(35),
//     isBillable: faker.datatype.boolean(),
//     timeCost: Duration.fromObject({
//       hour: faker.datatype.number(12),
//       minutes: faker.datatype.number(59),
//     }).toISOTime(),
//     tags: [faker.random.word(), faker.random.word()],
//   }
// })
//   .relation('project', () => ProjectFactory)
//   .build()
