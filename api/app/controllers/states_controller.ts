import type { HttpContext } from '@adonisjs/core/http'
import ResponseHandler from '#utils/response-object'
import State from '#models/state';

export default class StatesController {
  
  /**
   * Fetch all records
   */
  public async getAll({ response }: HttpContext) {
    try {
      let data = await State.all();
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
      let data = await State.find(params.id); 
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
      let state = new State(); 
      state.name = data.name; 
      state.code = data.code; 
      state.countryId = data.countryId; 
      await state.save(); 
      return ResponseHandler.created(response, State) 
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
      let state = await State.find(params.id); 
      if(state) {
        state.name = data.name; 
        state.code = data.code;
        state.countryId = data.countryId; 
        await state.save(); 
        return ResponseHandler.success(response, state)
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
      let state = await State.find(params.id); 
      if(state) {
        await state.softDelete(); 
        return ResponseHandler.success(response, {})
      } 
      return ResponseHandler.notFound(response, 'Record not found') 
    } catch (error) {
      return ResponseHandler.error(response, error.message)
    }
  }
}