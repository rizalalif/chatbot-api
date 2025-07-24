import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'messages'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary();
      table.uuid('conversation_id')
        .references('id')
        .inTable('conversations')
        .onDelete('cascade')
        .index();
      table.text('content').notNullable();
      table.enu('sender_type', ['ai', 'user']).notNullable();

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.raw('DROP TYPE IF EXISTS "sender_msg_type"')
    this.schema.dropTable(this.tableName)
  }
}
