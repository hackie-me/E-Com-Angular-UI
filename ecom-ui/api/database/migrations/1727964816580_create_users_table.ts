import { BaseSchema } from '@adonisjs/lucid/schema'
import CommonFields from '../../app/utils/common-fiealds.js'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('first_name').notNullable()
      table.string('last_name').notNullable()
      table.string('username', 191).unique().notNullable()
      table.string('email', 191).notNullable().unique()
      table.timestamp('email_verified_at').nullable() 
      table.string('password').notNullable()
      table.string('avatar').nullable()
      table.boolean('is_admin').defaultTo(false)
      CommonFields.applyCommonFields(table) 
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}