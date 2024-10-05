import { column } from '@adonisjs/lucid/orm'
import BaseModelWithCommonFields from '@utils/base-model'

export default class Shop extends BaseModelWithCommonFields {
  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'user_id' })
  declare userId: number

  @column({ columnName: 'author_name' })
  declare authorName: string

  @column({ columnName: 'email' })
  declare email: string

  @column({ columnName: 'phone' })
  declare phone: string

  @column({ columnName: 'logo' })
  declare logo: string

  @column({ columnName: 'description' })
  declare description: string

  @column({ columnName: 'company_name' })
  declare companyName: string

  @column({ columnName: 'website' })
  declare website: string

  @column({ columnName: 'country' })
  declare country: string

  @column({ columnName: 'state' })
  declare state: string

  @column({ columnName: 'city' })
  declare city: string

}