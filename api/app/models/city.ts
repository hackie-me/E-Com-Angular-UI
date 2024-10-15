import { column, hasOne } from '@adonisjs/lucid/orm'
import BaseModelWithCommonFields from '#utils/base-model'
import type { HasOne } from '@adonisjs/lucid/types/relations';
import User from './user.ts';
import State from './state.ts';

export default class City extends BaseModelWithCommonFields {
  @column({ isPrimary: true })
  declare id: number

	@column({ columnName: 'name' })
	declare name: string

	@column({ columnName: 'code' })
	declare code: string

	@column({ columnName: 'state_id' })
	declare stateId: number

  @hasOne(() => State, {
    foreignKey: 'id', // Assuming the State table has 'id' as the primary key
    localKey: 'stateId', // Assuming 'state_id' in City refers to State's 'id'
  })
  declare state: HasOne<typeof State>; // Declare the relationship

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