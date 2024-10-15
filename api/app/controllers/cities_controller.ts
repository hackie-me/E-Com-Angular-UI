import type { HttpContext } from '@adonisjs/core/http'
import ResponseHandler from '#utils/response-object'
import City from '#models/city';

export default class CitiesController {
  
   /**
   * Fetch all records
   */
   public async getAll({ response }: HttpContext) {
    try {
      let data = await City.all();
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
      let data = await City.find(params.id); 
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
      let city = new City(); 
      city.name = data.name; 
      city.code = data.code; 
      city.stateId = data.stateId; 
      await city.save(); 
      return ResponseHandler.created(response, city) 
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
      let city = await City.find(params.id); 
      if(city) {
        city.name = data.name; 
        city.code = data.code;
        city.stateId = data.stateId; 
        await city.save(); 
        return ResponseHandler.success(response, city)
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
      let city = await City.find(params.id); 
      if(city) {
        await city.softDelete(); 
        return ResponseHandler.success(response, {})
      } 
      return ResponseHandler.notFound(response, 'Record not found') 
    } catch (error) {
      return ResponseHandler.error(response, error.message)
    }
  }
}