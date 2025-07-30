import User from "App/Models/User"
export default class AuthService {

    async registerService(payload: { email: string, username: string, password: string }) {
        const { email, username, password } = payload
        const user = await User.create({ email, username, password });
        return user
    }



}
