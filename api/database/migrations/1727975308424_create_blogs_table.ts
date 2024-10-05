import { BaseSchema } from '@adonisjs/lucid/schema'
import CommonFields from '#utils/common-fiealds'

export default class extends BaseSchema {
  protected tableName = 'blogs'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary() 
      table.string('title', 255).notNullable()
      table.string('slug', 191).notNullable().unique() 
      table.text('content').notNullable()
      table.string('thumbnail', 255).notNullable()
      table.integer('category_id').unsigned().references('id').inTable('category_blogs').onDelete('CASCADE')
      CommonFields.applyCommonFields(table) 
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}