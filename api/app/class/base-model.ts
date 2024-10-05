import { DateTime } from 'luxon'
import { BaseModel, beforeSave, beforeUpdate, column } from '@adonisjs/lucid/orm'

export default class BaseModelWithCommonFields extends BaseModel {
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column.dateTime()
  declare deletedAt: DateTime | null

  @column()
  declare createdBy: number | null

  @column()
  declare updatedBy: number | null

  @column()
  declare deletedBy: number | null

  @column()
  declare isDeleted: boolean

  @column()
  declare isActive: boolean

  // Before saving a record (insert or update)
  @beforeSave()
  public static async assignCreatedBy(model: BaseModelWithCommonFields) {
    if (!model.$isPersisted) {
      // This runs before inserting a new record
      model.createdBy = model.createdBy || 1 // Example value (could be auth.user.id)
    }
  }

  // Before updating a record
  @beforeUpdate()
  public static async assignUpdatedBy(model: BaseModelWithCommonFields) {
    model.updatedBy = model.updatedBy || 1 // Example value (could be auth.user.id)
  }

  // Soft delete method
  public async softDelete() {
    this.isDeleted = true // Mark the record as deleted
    await this.save()
  }

  // Restore soft-deleted record
  public async restore() {
    this.isDeleted = false // Unmark as deleted
    await this.save()
  }

  // Override the default query to exclude soft-deleted records
  public static queryWithoutDeleted() {
    return this.query().where('isDeleted', false) // Only fetch non-deleted records
  }
}
