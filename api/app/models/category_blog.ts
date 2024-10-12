import { column, hasMany, hasOne } from '@adonisjs/lucid/orm'
import Blog from './blog.js'
import * as relations from '@adonisjs/lucid/types/relations'
import BaseModelWithCommonFields from '#utils/base-model'
import User from './user.js'

export default class CategoryBlog extends BaseModelWithCommonFields {

  @column({ isPrimary: true })
  declare id: number

  @column() 
  declare name: string 

  @hasOne(() => User, {
    foreignKey: 'id', // Assuming the User table has 'id' as the primary key
    localKey: 'createdBy', // Assuming 'created_by' in CategoryProduct refers to User's 'id'
  })
  declare created_by: relations.HasOne<typeof User>; // Declare the relationship

  @hasOne(() => User, {
    foreignKey: 'id', // Assuming the User table has 'id' as the primary key
    localKey: 'updatedBy', // Assuming 'created_by' in CategoryProduct refers to User's 'id'
  })
  declare updated_by: relations.HasOne<typeof User>; // Declare the relationship

  @hasOne(() => User, {
    foreignKey: 'id', // Assuming the User table has 'id' as the primary key
    localKey: 'deletedBy', // Assuming 'created_by' in CategoryProduct refers to User's 'id'
  })
  declare deleted_by: relations.HasOne<typeof User>; // Declare the relationship

  @hasMany(()=> Blog, {
    foreignKey: 'categoryId'
  })
  declare blogs: relations.HasMany<typeof Blog>

}