import { DateTime } from 'luxon'
import { BaseModel, HasMany, beforeCreate, beforeSave, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Hash from "@ioc:Adonis/Core/Hash";
import { uuidv7 } from 'uuidv7'
import Conversation from './Conversation'

export default class User extends BaseModel {
  @beforeCreate()
  public static assignUuid(user: User) {
    user.id = uuidv7()
  }

  @column({ isPrimary: true })
  declare id: string

  @column()
  declare email: string

  @column()
  declare username: string

  @column({ serializeAs: null })
  declare password: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Conversation)
  declare conversations: HasMany<typeof Conversation>

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
