// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Customer } from '../../Models'
// import Customer from 'App/Models/Customer'
// import Project from 'App/Models/Project'

export default class CustomersController {
  public async index() {
    return Customer.all()
  }
  // store
  // show
  // update
  // destroy
}
