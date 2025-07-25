import axios from "axios";

export default class AiService {
    private api_bot: string = "https://api.majadigi.jatimprov.go.id/api/external/chatbot/send-message";
    async sendMessageToBot(message: string, sessionId: string) {
        axios.defaults.headers.post['Content-Type'] = 'application/json'

        try {
            const response = await axios.post(this.api_bot, {
                question: message, session_id: sessionId

            },)
            console.log(response.config);

            // console.log(response.data.data.session_i);

            return { sessionId: response.data.data.sessionId, AI: response.data.data.message[0].text };
        } catch (error) {
            console.error(error.request.message);

            throw new Error(error)
        }
    }
}