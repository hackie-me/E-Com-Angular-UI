import type { HasOne } from '@adonisjs/lucid/types/relations';
import { column, hasOne } from '@adonisjs/lucid/orm'
import BaseModelWithCommonFields from '../class/base-model.js'
import Blog from './blog.js'

export default class BlogComment extends BaseModelWithCommonFields {
  @column({ isPrimary: true })
  declare id: number

  @column({columnName: 'blog_id'})
  declare blogId: number

  @column()
  declare name: string

  @column()
  declare email: string

  @column()
  declare message: string

  @hasOne(() => Blog, {
    foreignKey: 'id',
  })
  declare blog: HasOne<typeof Blog>
}
