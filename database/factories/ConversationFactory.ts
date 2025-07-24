import Conversation from 'App/Models/Conversation'
import Factory from '@ioc:Adonis/Lucid/Factory'
import { uuidv7 } from 'uuidv7'

export default Factory.define(Conversation, ({ faker }) => {
  return {
    title: faker.lorem.sentence(5),
    lastMessage: `User:${faker.lorem.sentence(5)},Bot:${faker.lorem.sentence(5)}`,
    sessionId: uuidv7(),
  }
}).build()
