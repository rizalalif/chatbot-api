// import { Exception } from "@adonisjs/core/build/standalone";
import axios from "axios";

export default class AiService {
    private api_bot: string = "https://api.majadigi.jatimprov.go.id/api/external/chatbot/send-message";
    async sendMessageToBot(prompt: { recentMessage: string, message: string }, sessionId: string) {
        axios.defaults.headers.post['Content-Type'] = 'application/json'
        const response = await axios.post(this.api_bot, {
            question: prompt.message, additional_context: prompt.recentMessage, session_id: sessionId

        },)

        return { sessionId: response.data.data.sessionId, AI: response.data.data.message[0].text };

    }
}