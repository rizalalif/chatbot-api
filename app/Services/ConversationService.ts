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
                console.log('exist');
                const recentMessages = (await conversation.related('messages').query().select('content', 'role').orderBy('created_at', 'desc').limit(10)).map((msg) => {
                    return `${msg.role}: ${msg.content} \n`
                })
                // console.log(recentMessages);

                message = `${recentMessages},\n user:${message}`
            }

            // console.log();


            const replied = await this.aiService.sendMessageToBot(message, conversation.sessionId)

            await Message.create({ content: replied.AI, conversationId: conversation.id, role: 'ai' })

            return { sessionId: replied.sessionId, AI: replied.AI, User: message }
        } catch (error) {
            console.error(error)
            throw new Error(error.message)
        }
    }

    async getMessages(sessionId: string, userId: string, page: number = 1, limit: number = 5) {

        const conversation = await Conversation.query()
            .where('session_id', sessionId)
            .where('user_id', userId)
            .select('id', 'session_id', 'title', 'created_at').firstOrFail()


        const messages = await conversation.related('messages').query().select('id', 'content', 'role', 'created_at').orderBy('created_at', 'desc').paginate(page, limit)

        return messages


    }

    async deleteConversation(id: string) {
        const conversation = await Conversation.findOrFail(id)
        await conversation.delete()
    }

    // async continueConversation(sessionId: string, message: string) {
    //     const recentMessages = Message.query().where('session_id', sessionId).limit(4).orderBy('created_at', 'desc')


    // }
}