import type { HttpContext } from '@adonisjs/core/http'
import ResponseHandler from '#utils/response-object'
import CategoryBlog from '#models/category_blog';
import CategoryProduct from '#models/category_product';
import { DateTime } from 'luxon';

export default class CategoriesController {

  /**
   * Fetch all records
   */
  public async getAll({ response }: HttpContext) {
    try {
      // Fetch all CategoryBlog records
      let data: any = await CategoryBlog.query().select('*').paginate(1, 10);

      // Map CategoryBlog data to desired format
      const blogCategories = await Promise.all(data.map(async (item: CategoryBlog) => {
        const user = await item.related('created_by').query().first(); // Fetch user associated with created_by
        const dt = DateTime.fromISO(item.createdAt.toString()).setZone('local');
        return {
          name: item.name,
          type: 'blog',
          created_by: user ? user.username : 'Unknown',
          created_at: `${dt.toFormat('dd/MM/yyyy')} ${dt.toFormat('hh:mm a')}` || 'N/A'
        };
      }));

      // Fetch all CategoryProduct records
      let prodCategory: any = await CategoryProduct.query().select('*');

      // Map CategoryProduct data to desired format
      const productCategories = await Promise.all(prodCategory.map(async (item: CategoryProduct) => {
        const user = await item.related('created_by').query().first(); // Fetch user associated with created_by
        const dt = DateTime.fromISO(item.createdAt.toString()).setZone('local');
        return {
          name: item.name,
          type: 'product',
          created_by: user ? user.username : 'Unknown',
          created_at: `${dt.toFormat('dd/MM/yyyy')} ${dt.toFormat('hh:mm a')}` || 'N/A'
        };
      }));

      // Merge the two arrays 
      const allCategories = blogCategories.concat(productCategories);

      // Sort allCategories array by created_at in descending order
      allCategories.sort((a: any, b: any) => {
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);

        // Handle cases where created_at might be null or invalid
        return dateB.getTime() - dateA.getTime(); // Sorts by descending order
      });


      return ResponseHandler.success(response, allCategories);
    } catch (error) {
      return ResponseHandler.error(response, error.message);
    }
  }



  /**
   * Create Record 
   */
  public async create({ request, response }: HttpContext) {
    try {
      // Get the request data 
      const data = request.all();
      // Create a new record in the database 
      if (data.categoryType === 'product') {
        const category = new CategoryProduct();
        category.name = data.name;
        await category.save();
        return ResponseHandler.success(response, category)
      }
      if (data.categoryType === 'blog') {
        const category = new CategoryBlog();
        category.name = data.name;
        await category.save();
        return ResponseHandler.success(response, category)
      }
      return ResponseHandler.error(response, 'Invalid type provided')
    } catch (error) {
      return ResponseHandler.error(response, error.message)
    }
  }
}