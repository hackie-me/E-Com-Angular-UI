import { DateTime } from 'luxon'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import { compose } from '@adonisjs/core/helpers'
import { column } from '@adonisjs/lucid/orm'
import hash from '@adonisjs/core/services/hash'
import BaseModelWithCommonFields from '#utils/base-model'

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
}
