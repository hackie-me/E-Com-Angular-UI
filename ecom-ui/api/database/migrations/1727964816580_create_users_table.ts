import { BaseSchema } from '@adonisjs/lucid/schema'
import CommonFields from '../../app/class/common-fiealds.js'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.string('full_name').nullable()
      table.string('email', 254).notNullable().unique()
      table.string('password').notNullable()
      CommonFields.applyCommonFields(table) 
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}