import Conversation from "App/Models/Conversation";
import Message from "App/Models/Message";
import { uuidv7 } from "uuidv7";
import AiService from "./AiService";
import { inject } from "@adonisjs/core/build/standalone";

@inject()
export default class ConversationService {
    constructor(protected aiService: AiService) { }
    async getConversation(user_id: string) {
        const conversations = await Conversation.query()
            .where('user_id', user_id) // <-- Gunakan nilai string dari ID pengguna
            .orderBy('updated_at', 'desc')

        return conversations
    }

    async createConversation(userId: string, message: string, sessionId: string | undefined = uuidv7()) {
        try {
            // const existConversation = await Conversation.findByOrFail('user_id', userId)
            const conversation = await Conversation.firstOrCreate({ sessionId, userId }, { title: message, sessionId, userId })
            // const newConversation = await Conversation.create({ title: message, sessionId, userId })
            await Message.create({
                content: message,
                conversationId: conversation.id,
                role: 'user'
            })

            if (!conversation.$isLocal) {
                const lastMessage = conversation.lastMessage
                message = `${lastMessage},${message} `
            }

            const aiResponse: string = await this.aiService.sendMessageToBot(message, conversation.sessionId)
            console.log(aiResponse);

            await Message.create({ content: aiResponse, conversationId: conversation.id, role: 'ai' })

            return { conversationId: conversation.id, aiResponse }
        } catch (error) {
            console.error(error)
            throw new Error(error.message)
        }
    }

    async getMessages(sessionId: string, userId: string) {

        const messages = await Message.query().preload('conversation', (query) => {
            query.where('sessionId', sessionId).andWhere('user_id', userId).orderBy('created_at', 'desc')
        })
        // const serialize = messages.map((msg) => msg.serialize())

        return messages

        // const postJson = messages.map((post) => post.sessionId == sessionId)




    }
}