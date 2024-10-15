import CommonFields from '#utils/common-fiealds'
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'cities'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name', 255).notNullable() 
      table.string('code', 255).notNullable() 
      table.integer('state_id').unsigned().references('id').inTable('states').onDelete('CASCADE') 
      CommonFields.applyCommonFields(table)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}