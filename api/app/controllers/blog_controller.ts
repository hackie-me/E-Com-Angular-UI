import Blog from '#models/blog'
import { InsertVallidator, UpdateVallidator } from '#validators/blog'
import type { HttpContext } from '@adonisjs/core/http'

export default class BlogController {

  public async getAll({ response }: HttpContext) {
    const data = await Blog.queryWithoutDeleted()
    return response
      .status(200)
      .json({ data })
  }
  public async getById({ response, params }: HttpContext) {
    const data = await Blog
      .query()
      .where('id', params.id)
      .preload('comments')
      .firstOrFail();
    return response
      .status(200)
      .json(data)
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
    return response
      .status(201)
      .json({ data: blog })
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
    return response
      .status(200)
      .json({ data: blog })
  }
  public async delete({ response, params }: HttpContext) {
    const blog = await Blog.findOrFail(params.id)
    await blog.softDelete()
    return response
      .status(204)
      .json({ data: null })
  }

}