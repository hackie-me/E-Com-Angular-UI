import { column, hasMany, hasOne } from '@adonisjs/lucid/orm'
import type { HasMany, HasOne } from '@adonisjs/lucid/types/relations'
import CategoryBlog from './category_blog.js'
import BlogComment from './blog_comment.js'
import BaseModelWithCommonFields from '#utils/base-model'
import User from './user.js'

export default class Blog extends BaseModelWithCommonFields {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare slug: string

  @column()
  declare content: string

  @column()
  declare thumbnail: string

  @column({columnName: 'category_id'})
  declare categoryId: number

  @hasOne(() => CategoryBlog, {
    foreignKey: 'category_id',
  })
  declare category: HasOne<typeof CategoryBlog>

  @hasMany(()=> BlogComment, {
    foreignKey: 'blogId'
  })
  declare comments: HasMany<typeof BlogComment>

  @hasOne(() => User, {
    foreignKey: 'id', // Assuming the User table has 'id' as the primary key
    localKey: 'createdBy', // Assuming 'created_by' in CategoryProduct refers to User's 'id'
  })
  declare created_by: HasOne<typeof User>; // Declare the relationship

  @hasOne(() => User, {
    foreignKey: 'id', // Assuming the User table has 'id' as the primary key
    localKey: 'updatedBy', // Assuming 'created_by' in CategoryProduct refers to User's 'id'
  })
  declare updated_by: HasOne<typeof User>; // Declare the relationship

  @hasOne(() => User, {
    foreignKey: 'id', // Assuming the User table has 'id' as the primary key
    localKey: 'deletedBy', // Assuming 'created_by' in CategoryProduct refers to User's 'id'
  })
  declare deleted_by: HasOne<typeof User>; // Declare the relationship
}
