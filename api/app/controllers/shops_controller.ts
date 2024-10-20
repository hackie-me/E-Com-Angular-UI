import Shop from '#models/shop'
import ResponseHandler from '#utils/response-object'
import type { HttpContext } from '@adonisjs/core/http'

export default class ShopsController {

  /**
   * Fetch all records
   */
  public async getAll({ response }: HttpContext) {
    try {
      let data: any = await Shop.query().select('*').paginate(1, 10);

      data = await Promise.all(data.map(async (item: Shop) => {
        const user = await item.related('created_by').query().first(); // Fetch user associated with created_by
        return {
          id: item.id,
          authorName: item.authorName,
          email: item.email,
          phone: item.phone,
          logo: item.logo,
          companyName: item.companyName,
          createdBy: user ? user.username : 'Unknown',
          createdAt: item.createdAt
        };
      }));
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
      shop.authorName = request.input('authorName') 
      shop.email = request.input('email') 
      shop.phone = request.input('phone') 
      shop.description = request.input('description') 
      shop.logo = '' 
      shop.companyName = request.input('companyName') 
      shop.website = request.input('website') 
      shop.country = request.input('country') 
      shop.state = request.input('state') 
      shop.city = request.input('city') 
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