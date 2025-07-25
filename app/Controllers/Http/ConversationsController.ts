import { inject } from '@adonisjs/core/build/standalone';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ConversationService from 'App/Services/ConversationService';


@inject()
export default class ConversationsController {
  constructor(protected conversationService: ConversationService) {
  }
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
    const { sessionId, AI } = await this.conversationService.createConversation(userId, payload.message)

    const data = {
      sessionId,
      AI
    }

    return response.ok({
      statusCode: response.getStatus(),
      message: "OK",
      data
    })

  }

  public async replyExistConversation({ auth, request, response }: HttpContextContract) {
    const userId = auth.user?.id!
    await auth.use('api').authenticate();
    const payload = request.only(["message"])

    const { sessionId } = request.params()
    const replied = await this.conversationService.createConversation(userId, payload.message, sessionId)
    const data = {
      sessionId: replied.sessionId,
      AI: replied.AI,
      User: replied.User,
    }

    return response.ok({
      statusCode: response.getStatus(),
      message: "OK",
      data
    })

  }

  public async showChat({ auth, request, response }: HttpContextContract) {
    try {
      const userId = auth.user?.id!
      // const userId = "019832ec-16c5-766a-8ef5-62b3c5570fa1"
      const sessionId = request.param('sessionId')
      const page = request.input('page')
      const limit = request.input('limit')
      console.log(sessionId);
      console.log(auth.user?.email);

      const messages = await this.conversationService.getMessages(sessionId, userId, page, limit)

      return response.ok({
        statusCode: response.getStatus(),
        message: "OK",
        data: messages
      })

    } catch (error) {
      return response.notFound({
        message: error
      })
    }
  }

  public async destroy({ auth, request, response }: HttpContextContract) {
    // const userId = auth.user?.id!
    await auth.use('api').authenticate();
    const conversationId = request.param('id')
    await this.conversationService.deleteConversation(conversationId)


  }
  public async update({ }: HttpContextContract) { }

}
