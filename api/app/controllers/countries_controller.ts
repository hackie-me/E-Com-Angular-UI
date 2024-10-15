import type { HttpContext } from '@adonisjs/core/http'
import ResponseHandler from '#utils/response-object'
import Country from '#models/country'

export default class CountriesController {
  
  /**
   * Fetch all records
   */
  public async getAll({ response }: HttpContext) {
    try {
      let data = await Country.all();
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
      let data = await Country.find(params.id); 
      if(data) {
        return ResponseHandler.success(response, data)
      } 
      return ResponseHandler.notFound(response, 'Record not found') 
    } catch (error) {
      return ResponseHandler.error(response, error.message) 
    } 
  }

  /**
   * Create a new record
   */
  public async create({ response, request }: HttpContext) {
    try {
      let data = request.all(); 
      let country = new Country(); 
      country.name = data.name; 
      country.code = data.code; 
      country.phoneCode = data.phoneCode; 
      await country.save(); 
      return ResponseHandler.created(response, country) 
    } catch (error) {
      return ResponseHandler.error(response, error.message)
    }
  }

  /**
   * Update an existing record
   */
  public async update({ response, params, request }: HttpContext) {
    try {
      let data = request.all(); 
      let country = await Country.find(params.id); 
      if(country) {
        country.name = data.name; 
        country.code = data.code; 
        country.phoneCode = data.phoneCode; 
        await country.save(); 
        return ResponseHandler.success(response, country)
      } 
      return ResponseHandler.notFound(response, 'Record not found') 
    } catch (error) {
      return ResponseHandler.error(response, error.message)
    }
  }

  /**
   * Soft delete a record
   */
  public async delete({ response, params }: HttpContext) {
    try {
      let country = await Country.find(params.id); 
      if(country) {
        await country.softDelete(); 
        return ResponseHandler.success(response, {})
      } 
      return ResponseHandler.notFound(response, 'Record not found') 
    } catch (error) {
      return ResponseHandler.error(response, error.message)
    }
  }
}