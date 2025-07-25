import Message from 'App/Models/Message'
import Factory from '@ioc:Adonis/Lucid/Factory'

enum Role {
  AI = "ai",
  User = "user",
}
export default Factory.define(Message, ({ faker }) => {
  return {
    content: faker.lorem.paragraph(),
    role: Role.User,
    conversationId: "01983f57-1295-7e94-8c06-b3aa0ffe41c0"
  }
}).build()
