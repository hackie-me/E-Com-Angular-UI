import Blog from '#models/blog'
import ResponseHandler from '#utils/response-object'
import { InsertVallidator, UpdateVallidator } from '#validators/blog'
import type { HttpContext } from '@adonisjs/core/http'

export default class BlogController {

  public async getAll({ response }: HttpContext) {
    
    let data: any = await Blog.query().select('*').paginate(1, 10);

    const blogData = await Promise.all(data.map(async (item: Blog) => {
      const user = await item.related('created_by').query().first(); // Fetch user associated with created_by
      const category = await item.related('category').query().first(); // Fetch category associated with blog 
      return {
        id: item.id, 
        thumbnail: item.thumbnail, 
        title: item.title,
        slug: item.slug, 
        category: category ? category.name : 'Unknown',
        createdBy: user ? user.username : 'Unknown',
        createdAt: item.createdAt
      };
    }));

    ResponseHandler.success(response, blogData) 
  }
  public async getById({ response, params }: HttpContext) {
    const data = await Blog
      .query()
      .where('id', params.id)
      .preload('comments')
      .firstOrFail();
    return ResponseHandler.success(response, data) 
  }
  public async create({ response, request }: HttpContext) {
    const payload = await request.validateUsing(InsertVallidator);
    const blog = new Blog()
    blog.title = payload.title;
    blog.slug = payload.slug;
    blog.content = payload.content;
    blog.thumbnail = payload.thumbnail;
    blog.categoryId = payload.category_id;
    await blog.save()
    return ResponseHandler.created(response , blog) 
  }
  public async update({ response, params, request }: HttpContext) {
    const payload = await request.validateUsing(UpdateVallidator);
    const blog = await Blog.findOrFail(params.id)
    blog.title = payload.title;
    blog.slug = payload.slug;
    blog.content = payload.content;
    blog.thumbnail = payload.thumbnail;
    blog.categoryId = payload.category_id;
    await blog.save()
    return ResponseHandler.success(response, blog) 
  }
  public async delete({ response, params }: HttpContext) {
    const blog = await Blog.findOrFail(params.id)
    await blog.softDelete()
    return ResponseHandler.success(response , []) 
  }

}