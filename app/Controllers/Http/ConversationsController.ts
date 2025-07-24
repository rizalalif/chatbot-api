import { inject } from '@adonisjs/core/build/standalone';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ConversationService from 'App/Services/ConversationService';


@inject()
export default class ConversationsController {
  constructor(protected conversationService: ConversationService) { }
  public async index({ auth, response }: HttpContextContract) {
    await auth.use('api').authenticate();
    const authUser = auth.user?.id!

    const data = await this.conversationService.getConversation(authUser);

    return response.ok({
      statusCode: response.getStatus(),
      message: "OK",
      data
    })



  }

  public async create({ auth, request, response }: HttpContextContract) {
    const userId = auth.user?.id!
    await auth.use('api').authenticate();
    console.log(auth.user?.email);
    const payload = request.only(["message"])
    const { conversationId, aiResponse } = await this.conversationService.createConversation(userId, payload.message)

    const data = {
      conversationId,
      aiResponse
    }

    return response.ok({
      statusCode: response.getStatus(),
      message: "OK",
      data
    })

  }

  public async reply({ auth, request, response }: HttpContextContract) {
    const userId = auth.user?.id!
    await auth.use('api').authenticate();
    const payload = request.only(["message"])

    const { sessionId } = request.params()
    const { conversationId, aiResponse } = await this.conversationService.createConversation(userId, payload.message, sessionId)

    const data = {
      conversationId,
      aiResponse
    }

    return response.ok({
      statusCode: response.getStatus(),
      message: "OK",
      data
    })

  }

  public async showChat({ auth, request, response }: HttpContextContract) {
    const userId = auth.user?.id!
    // const userId = "019832ec-16c5-766a-8ef5-62b3c5570fa1"
    const sessionId = request.param('sessionId')
    console.log(sessionId);

    const messages = await this.conversationService.getMessages(sessionId, userId)

    return response.ok({
      statusCode: response.getStatus(),
      message: "OK",
      data: messages
    })
  }

  public async edit({ }: HttpContextContract) { }

  public async update({ }: HttpContextContract) { }

  public async destroy({ }: HttpContextContract) { }
}
