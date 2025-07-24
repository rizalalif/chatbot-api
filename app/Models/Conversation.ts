import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, beforeCreate, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Message from './Message'
import User from './User'
import { uuidv7 } from 'uuidv7'

export default class Conversation extends BaseModel {
  @beforeCreate()
  public static assignUuid(conversation: Conversation) {
    conversation.id = uuidv7()
  }

  @column({ isPrimary: true })
  declare id: string

  @column()
  declare sessionId: string

  @column()
  declare userId: string

  @column()
  declare title: string

  @column()
  declare lastMessage: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Message)
  declare messages: HasMany<typeof Message>

  @belongsTo(() => User)
  declare users: BelongsTo<typeof User>
}
