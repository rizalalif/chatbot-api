import { inject } from '@adonisjs/core/build/standalone';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ConversationService from 'App/Services/ConversationService';
import CreateConversationValidator from 'App/Validators/Conversation/CreateConversationValidator';


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
    const { message } = await request.validate(CreateConversationValidator)
    const data = await this.conversationService.createConversation(userId, message)
    return response.ok({
      statusCode: response.getStatus(),
      message: "OK",
      data
    })

  }

  public async replyExistConversation({ auth, request, response }: HttpContextContract) {
    const userId = auth.user?.id!
    await auth.use('api').authenticate();
    const { message } = await request.validate(CreateConversationValidator)
    const { sessionId } = request.params()
    const data = await this.conversationService.createConversation(userId, message, sessionId)
    return response.ok({
      statusCode: response.getStatus(),
      message: "OK",
      data
    })

  }

  public async showChat({ auth, request, response }: HttpContextContract) {
    const userId = auth.user?.id!
    const sessionId = request.param('sessionId')
    const page = request.input('page')
    const limit = request.input('limit')
    const messages = await this.conversationService.getMessages(sessionId, userId, page, limit)
    return response.ok({
      statusCode: response.getStatus(),
      message: "OK",
      data: messages
    })

  }

  public async destroy({ auth, request, response }: HttpContextContract) {
    await auth.use('api').authenticate();
    const conversationId = request.param('id')
    await this.conversationService.deleteConversation(conversationId)
    return response.ok({
      statusCode: response.getStatus(),
      message: "OK",
    })

  }
  public async update({ }: HttpContextContract) { }

}
