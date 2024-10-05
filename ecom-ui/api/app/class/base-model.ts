import { DateTime } from 'luxon'
import { BaseModel, beforeSave, beforeUpdate, column } from '@adonisjs/lucid/orm'
import { HttpContext } from '@adonisjs/core/http';

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

  // Handle createdBy and updatedBy fields before saving a record
  @beforeSave()
  public static async handleUserFields(model: BaseModelWithCommonFields) {
    const ctx = HttpContext.get()

    if (ctx?.auth?.user) {
      const userId = ctx.auth.user.id
      
      model.updatedBy = userId 
      
      if (model.$isNew) {
        model.createdBy = userId 
      }
    }
  }

  // Soft delete method
  public async softDelete() {
    this.isDeleted = true // Mark the record as deleted
    this.deletedAt = DateTime.local() // Set the deletedAt timestamp 
    await this.save()
  }

  // Restore soft-deleted record
  public async restore() {
    this.isDeleted = false // Unmark as deleted
    this.deletedAt = null // Remove the deletedAt timestamp
    await this.save()
  }

  // Override the default query to exclude soft-deleted records
  public static queryWithoutDeleted() {
    return this.query().where('isDeleted', false) // Only fetch non-deleted records
  }

  // Override the default query to include only soft-deleted records 
  public static queryDeleted() {
    return this.query().where('isDeleted', true) // Only fetch deleted records
  }
}
