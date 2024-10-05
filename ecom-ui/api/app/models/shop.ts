import { column } from '@adonisjs/lucid/orm'
import BaseModelWithCommonFields from '@utils/base-model'

export default class Shop extends BaseModelWithCommonFields {
  @column({ isPrimary: true })
  declare id: number


}