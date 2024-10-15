import CommonFields from '#utils/common-fiealds'
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'countries'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name', 255).notNullable() 
      table.string('code', 255).notNullable() 
      table.string('phone_code', 255).notNullable() 
      CommonFields.applyCommonFields(table)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}