import User from "App/Models/User"

export default class AuthService {

    public async registerService(payload: { email: string, username: string, password: string }) {
        const { email, username, password } = payload
        console.log(`user :`);

        try {
            const user = await User.create({ email, username, password });
            console.log(`user : ${user}`);
            return user
        } catch (error) {
            throw new console.error(error);

        }

    }
}
