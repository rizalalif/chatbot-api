import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AuthService from 'App/Services/AuthService';
import { inject } from '@adonisjs/core/build/standalone';
import RegisterValidator from 'App/Validators/Auth/RegisterValidator';

@inject()
export default class UsersController {
    constructor(protected authService: AuthService) { }
    async register({ request, response }: HttpContextContract) {
        const payload = await request.validate(RegisterValidator);
        const createdUser = await this.authService.registerService(payload);
        return response.ok({
            statusCode: response.getStatus(),
            message: "OK",
            data: createdUser
        })
    }

    async login({ auth, request, response }: HttpContextContract) {
        const { email, password } = request.body()
        const expiresIn = '60 mins';
        const token = await auth.use('api').attempt(email, password, {
            expiresIn
        })
        return token.toJSON()

    }

}
