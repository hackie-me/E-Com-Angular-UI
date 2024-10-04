import { column } from '@adonisjs/lucid/orm'
import BaseModelWithCommonFields from '../class/base-model.js'

export default class BlogComment extends BaseModelWithCommonFields {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare blogId: number 

  @column() 
  declare comment: string 

  @column() 
  declare userId: number 
}