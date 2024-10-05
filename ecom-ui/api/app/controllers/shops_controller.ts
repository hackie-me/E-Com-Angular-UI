import Shop from '#models/shop'
import type { HttpContext } from '@adonisjs/core/http'
import ResponseHandler from '@utils/response-object'

export default class ShopsController {
  
  /**
   * Fetch all records
   */
  public async getAll({ response }: HttpContext) {
    try {
      const data = await Shop.queryWithoutDeleted() 
      return ResponseHandler.success(response, data)
    } catch (error) {
      return ResponseHandler.error(response, error.message)
    }
  }

  /**
   * Fetch a single record by ID
   */
  public async getById({ response, params }: HttpContext) {
    try {
      const data = await Shop.findOrFail(params.id) 
      return ResponseHandler.success(response, data)
    } catch (error) {
      return ResponseHandler.notFound(response, error.message)
    }
  }

  /**
   * Create a new record
   */
  public async create({ response, request }: HttpContext) {
    try {
      const shop = new Shop() 
      await shop.save() 
      return ResponseHandler.created(response, shop)
    } catch (error) {
      return ResponseHandler.error(response, error.message)
    }
  }

  /**
   * Update an existing record
   */
  public async update({ response, params, request }: HttpContext) {
    try {
      const shop = await Shop.findOrFail(params.id) 
      await shop.save() 
      return ResponseHandler.success(response, [])
    } catch (error) {
      return ResponseHandler.error(response, error.message)
    }
  }

  /**
   * Soft delete a record
   */
  public async delete({ response, params }: HttpContext) {
    try {
      const shop = await Shop.findOrFail(params.id) 
      await shop.softDelete() 
      return ResponseHandler.success(response, {})
    } catch (error) {
      return ResponseHandler.error(response, error.message)
    }
  }
}