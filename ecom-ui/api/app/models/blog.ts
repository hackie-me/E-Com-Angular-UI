import { column, hasMany, hasOne } from '@adonisjs/lucid/orm'
import BaseModelWithCommonFields from '../class/base-model.js'
import type { HasMany, HasOne } from '@adonisjs/lucid/types/relations'
import CategoryBlog from './category_blog.js'
import BlogComment from './blog_comment.js'

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
}
