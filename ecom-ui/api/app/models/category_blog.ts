import { column, hasMany } from '@adonisjs/lucid/orm'
import BaseModelWithCommonFields from '../class/base-model.js'
import Blog from './blog.js'
import * as relations from '@adonisjs/lucid/types/relations'

export default class CategoryBlog extends BaseModelWithCommonFields {

  @column({ isPrimary: true })
  declare id: number

  @column() 
  declare name: string 

  @hasMany(()=> Blog, {
    foreignKey: 'category_id'
  })
  declare blogs: relations.HasMany<typeof Blog>

}