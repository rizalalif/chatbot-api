/*
|--------------------------------------------------------------------------
| Http Exception Handler
|--------------------------------------------------------------------------
|
| AdonisJs will forward all exceptions occurred during an HTTP request to
| the following class. You can learn more about exception handling by
| reading docs.
|
| The exception handler extends a base `HttpExceptionHandler` which is not
| mandatory, however it can do lot of heavy lifting to handle the errors
| properly.
|
*/

import Logger from '@ioc:Adonis/Core/Logger'
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { DatabaseError } from "pg";
import { AxiosError } from 'axios';


export default class ExceptionHandler extends HttpExceptionHandler {
  constructor() {
    super(Logger)
  }
  public async handle(error: any, ctx: HttpContextContract): Promise<any> {
    // validation error
    if (error.code === 'E_VALIDATION_FAILURE') {
      return ctx.response.status(422).send({
        statusCode: ctx.response.getStatus(),
        message: 'Validation Error',
        errors: error.messages.errors[0].message,
      })

    }

    // data not found in database
    if (error.code === 'E_ROW_NOT_FOUND') {
      return ctx.response.status(404).send({
        statusCode: ctx.response.getStatus(),
        message: 'Data Not Found',
        errors: error,
      })
    }

    if (error.code === 'E_UNAUTHORIZED_ACCESS') {
      return ctx.response.status(403).send({
        statusCode: ctx.response.getStatus(),
        message: 'You are Unauthorized',
      })
    }
    if (error instanceof AxiosError) {
      return ctx.response.status(503).send({
        statusCode: ctx.response.getStatus(),
        message: 'Service Unavailable',
      })
    }

    if (error instanceof DatabaseError) {
      return ctx.response.status(500).send({
        statusCode: ctx.response.getStatus(),
        message: 'Database Error',
      })
    }


    return super.handle(error, ctx)
  }
}
