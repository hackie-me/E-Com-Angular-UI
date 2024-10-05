import { BaseSchema } from '@adonisjs/lucid/schema'
import CommonFields from '#utils/common-fiealds'

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