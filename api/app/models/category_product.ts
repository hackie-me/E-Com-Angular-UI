import { column } from '@adonisjs/lucid/orm'
import BaseModelWithCommonFields from '../class/base-model.js'

export default class CategoryProduct extends BaseModelWithCommonFields {
  @column({ isPrimary: true })
  declare id: number

  @column() 
  declare name: string 
  
}