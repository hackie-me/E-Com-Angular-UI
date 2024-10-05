import { BaseSchema } from '@adonisjs/lucid/schema'
import CommonFields from '../../app/class/common-fiealds.js'

export default class extends BaseSchema {
  protected tableName = 'category_blogs'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary() 
      table.string('name', 255).notNullable()
      CommonFields.applyCommonFields(table) 
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}