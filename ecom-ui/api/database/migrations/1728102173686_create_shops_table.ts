import { BaseSchema } from '@adonisjs/lucid/schema'
import CommonFields from '../../app/utils/common-fiealds.js'

export default class extends BaseSchema {
  protected tableName = 'shops'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.string('author_name', 255).notNullable()
      table.string('email', 255).notNullable()
      table.string('phone', 255).notNullable()
      table.string('logo', 255).notNullable()
      table.text('description').notNullable()
      table.string('company_name', 255).notNullable()
      table.string('website', 255).nullable()
      table.string('country', 255).notNullable()
      table.string('state', 255).notNullable()
      table.string('city', 255).notNullable()
      CommonFields.applyCommonFields(table)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}