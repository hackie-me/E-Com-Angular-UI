import BlogComment from '#models/blog_comment'
import ResponseHandler from '#utils/response-object'
import { InsertVallidator, UpdateVallidator } from '#validators/blog_comment'
import type { HttpContext } from '@adonisjs/core/http'

export default class BlogCommentsController {

  public async getAll({ response }: HttpContext) {
    const data = await BlogComment.queryWithoutDeleted()
    return response
      .status(200)
      .json({ data })
  }
  public async getById({ response, params }: HttpContext) {
    const data = await BlogComment.findOrFail(params.id)
    return response
      .status(200)
      .json({ data })
  }
  public async create({ response, request }: HttpContext) {
    const payload = await request.validateUsing(InsertVallidator);
    const comment = new BlogComment()
    comment.name = payload.name;
    comment.email = payload.email;
    comment.message = payload.message;
    comment.blogId = payload.blog_id;
    await comment.save()
    return ResponseHandler.created(response, comment)
  }
  public async update({ response, params, request }: HttpContext) {
    const payload = await request.validateUsing(UpdateVallidator);
    const comment = await BlogComment.findOrFail(params.id)
    comment.name = payload.name;
    comment.email = payload.email;
    comment.message = payload.message;
    comment.blogId = payload.blog_id;
    await comment.save()
    return ResponseHandler.success(response, comment)
  }
  public async delete({ response, params }: HttpContext) {
    const comment = await BlogComment.findOrFail(params.id)
    await comment.softDelete()
    return ResponseHandler.success(response, [])
  }

}