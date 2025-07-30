import Application from '@ioc:Adonis/Core/Application'
import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import Conversation from 'App/Models/Conversation'
import ConversationService from 'App/Services/ConversationService'
import ConversationFactory from 'Database/factories/ConversationFactory'
import UserFactory from 'Database/factories/UserFactory'

test.group('Conversation (integration)', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })
  test('get conversation on specific user', async ({ assert }) => {
    const user1 = await UserFactory.create()
    const user2 = await UserFactory.create()

    await ConversationFactory.merge({ userId: user1.id }).createMany(3)
    await ConversationFactory.merge({ userId: user2.id }).createMany(2)


    const conversationService = Application.container.make(ConversationService)

    const conversationsByUser = await conversationService.getConversation(user1.id);

    assert.lengthOf(conversationsByUser, 3)
    assert.isTrue(conversationsByUser.every((conv) => conv.userId === user1.id))


  })
})
