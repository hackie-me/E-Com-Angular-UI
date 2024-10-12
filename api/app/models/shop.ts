import { column, hasOne } from '@adonisjs/lucid/orm'
import BaseModelWithCommonFields from '#utils/base-model'
import type { HasOne } from '@adonisjs/lucid/types/relations'
import User from './user.js'

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

	@column({ columnName: 'name' })
	declare name: string

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