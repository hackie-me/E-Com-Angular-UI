import { column, hasOne } from '@adonisjs/lucid/orm'
import BaseModelWithCommonFields from '#utils/base-model'
import type { HasOne } from '@adonisjs/lucid/types/relations';
import User from './user.ts';

export default class Country extends BaseModelWithCommonFields {
  @column({ isPrimary: true })
  declare id: number
  @column({ columnName: 'name' })
	declare name: string

	@column({ columnName: 'code' })
	declare code: string

	@column({ columnName: 'phone_code' })
	declare phoneCode: string

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