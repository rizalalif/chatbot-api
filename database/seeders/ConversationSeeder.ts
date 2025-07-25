import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import MessageFactory from 'Database/factories/MessageFactory'

export default class extends BaseSeeder {
  public async run() {
    // 1. Ambil semua user yang ada di database
    // const users = await User.all()

    // 2. Looping untuk setiap user
    // for (const user of users) {/
    // 3. Buat 3 percakapan untuk user ini
    //    dan untuk setiap percakapan, buat 15 pesan
    //   await ConversationFactory.with('messages', 15)
    //     .merge({ userId: user.id }) // Hubungkan dengan user yang ada
    //     .createMany(3)
    // }
    await MessageFactory.createMany(1000)
  }
}
