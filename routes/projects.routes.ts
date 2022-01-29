import Route from '@ioc:Adonis/Core/Route'
import { ROUTES } from './routes.constants'

Route.resource(ROUTES.PROJECTS, 'ProjectsController').apiOnly()
