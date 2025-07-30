import { test } from '@japa/runner'
import sinon from "sinon";
import ConversationService from 'App/Services/ConversationService'
import AiService from 'App/Services/AiService';
import Conversation from 'App/Models/Conversation';
import { uuidv7 } from 'uuidv7';
import Message from 'App/Models/Message';

test.group('Conversation', (group) => {

  group.each.teardown(() => {
    sinon.restore()
  })
  const dummyAi = sinon.createStubInstance(AiService);
  const conversationService = new ConversationService(dummyAi);

  test('create new conversation', async ({ assert }) => {

    dummyAi.sendMessageToBot.resolves({ AI: 'Dummy AI response', sessionId: 'session-baru' })

    const firstOrCreatestub = sinon.stub(Conversation, 'firstOrCreate').resolves({
      id: 'convo-uuid-1',
      sessionId: 'session-baru',
      userId: 'user-uuid-1',
      title: 'Pesan pertama',
      $isLocal: true,
    } as Conversation)
    const createMessageStub = sinon.stub(Message, 'create').resolves({} as Message)

    // ---- 2. Aksi ----
    const result = await conversationService.createConversation('user-uuid-1', 'Pesan pertama')

    // ---- 3. Pengecekan (Assert) ----
    // Pastikan Conversation.firstOrCreate dipanggil dengan benar
    assert.isTrue(firstOrCreatestub.calledOnce)

    // Pastikan Message.create dipanggil 2x (user & AI)
    assert.equal(createMessageStub.callCount, 2)
    assert.isTrue(createMessageStub.calledWith({ content: 'Pesan pertama', conversationId: 'convo-uuid-1', role: 'user' }))
    assert.isTrue(createMessageStub.calledWith({ content: 'Dummy AI response', conversationId: 'convo-uuid-1', role: 'ai' }))

    // Pastikan AI Service dipanggil
    assert.isTrue(dummyAi.sendMessageToBot.calledOnce)

    // Pastikan return value sesuai
    assert.deepEqual(result, { sessionId: 'session-baru', AI: 'Dummy AI response', User: 'Pesan pertama' })

  })

  
})