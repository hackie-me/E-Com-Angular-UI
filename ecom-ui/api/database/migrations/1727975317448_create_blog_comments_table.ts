import { BaseSchema } from '@adonisjs/lucid/schema'
import CommonFields from '../../app/utils/common-fiealds.js'

export default class extends BaseSchema {
  protected tableName = 'blog_comments'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary() 
      table.integer('blog_id').unsigned().references('id').inTable('blogs').onDelete('CASCADE')
      table.string('name', 255).notNullable() 
      table.string('email', 255).notNullable() 
      table.text('message').notNullable()
      CommonFields.applyCommonFields(table) 
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}