import Route from '@ioc:Adonis/Core/Route'

Route.resource('/tasks', 'TasksController').apiOnly()
