export default class CommonFields {
    // Static field names for consistency across your migrations
    public static deletedAt = 'deleted_at'
    public static createdBy = 'created_by'
    public static updatedBy = 'updated_by'
    public static deletedBy = 'deleted_by'
    public static isDeleted = 'is_deleted'
    public static isActive = 'is_active'
  
    // Method to apply the fields to the table
    public static applyCommonFields(table: any) {
      table.timestamps(true, true)
      table.timestamp(CommonFields.deletedAt).nullable()
      table.integer(CommonFields.createdBy).nullable()
      table.integer(CommonFields.updatedBy).nullable()
      table.integer(CommonFields.deletedBy).nullable()
      table.boolean(CommonFields.isDeleted).defaultTo(false)
      table.boolean(CommonFields.isActive).defaultTo(true)
    }
  }
  