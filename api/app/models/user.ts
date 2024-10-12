import { DateTime } from 'luxon'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import { compose } from '@adonisjs/core/helpers'
import { column, hasMany, hasOne } from '@adonisjs/lucid/orm'
import hash from '@adonisjs/core/services/hash'
import BaseModelWithCommonFields from '#utils/base-model'
import CategoryProduct from './category_product.js'
import type { HasMany, HasOne } from '@adonisjs/lucid/types/relations'
import CategoryBlog from './category_blog.js'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModelWithCommonFields, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'first_name' })
  declare firstName: string | null

  @column({ columnName: 'last_name' })
  declare lastName: string | null

  @column()
  declare email: string

  @column()
  declare username: string

  @column()
  declare password: string

  @column()
  declare avatar: string | null

  @column.dateTime({ autoCreate: false })
  declare emailVerifiedAt: DateTime | null

  @column()
  declare isAdmin: boolean

  static accessTokens = DbAccessTokensProvider.forModel(User, {
    expiresIn: '1 day',
    prefix: 'oat_',
    table: 'auth_access_tokens',
    type: 'auth_token',
    tokenSecretLength: 40,
  })

  @hasMany(() => CategoryProduct, {
    foreignKey: 'created_by', // This field in CategoryProduct refers to the User's id
  })
  declare categoryProducts: HasMany<typeof CategoryProduct>;

  @hasMany(() => CategoryBlog, {
    foreignKey: 'created_by', // This field in CategoryBlog refers to the User's id
  })
  declare categoryBlogs: HasMany<typeof CategoryBlog>;

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
