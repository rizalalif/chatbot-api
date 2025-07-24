import axios from "axios";

export default class AiService {
    private api_bot: string = "https://api.majadigi.jatimprov.go.id/api/external/chatbot/send-message";

    async sendMessageToBot(message: string, sessionId: string) {
        try {
            const response = await axios.post(this.api_bot, {
                message, sessionId

            })
            // const data = response.data ?? 'Maaf, saya tidak mendapatkan jawaban yang valid.';
            return response.data.data.message[0].text;
        } catch (error) {
            throw new Error(error)
        }
    }
}