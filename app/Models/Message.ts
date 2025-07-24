import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, beforeCreate, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Conversation from './Conversation'
import { uuidv7 } from 'uuidv7'

export default class Message extends BaseModel {
  @beforeCreate()
  public static assignUuid(message: Message) {
    message.id = uuidv7()
  }
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare conversationId: string

  @column()
  declare content: string

  @column({ columnName: "sender_type" })
  declare role: 'ai' | 'user'


  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Conversation)
  declare conversation: BelongsTo<typeof Conversation>
}
