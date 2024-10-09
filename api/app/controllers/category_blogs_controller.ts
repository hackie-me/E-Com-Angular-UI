// import type { HttpContext } from '@adonisjs/core/http'

import CategoryBlog from "#models/category_blog";
import ResponseHandler from "#utils/response-object";
import { HttpContext } from "@adonisjs/core/http";

export default class CategoryBlogsController {
    public async getAll({ response }: HttpContext) {
        const data = await CategoryBlog.queryWithoutDeleted()
        return ResponseHandler.success(response, data) 
    }
    public async getById({ response, params }: HttpContext) {
        const data = await CategoryBlog.findOrFail(params.id)
        return ResponseHandler.success(response, data)  
    }
    public async create({ response, request }: HttpContext) {
        const category = new CategoryBlog()
        category.name = request.input('name')
        await category.save()
        return ResponseHandler.created(response, category) 
    }
    public async update({ response, params, request }: HttpContext) {
        const category = await CategoryBlog.findOrFail(params.id)
        category.name = request.input('name')
        await category.save()
        return ResponseHandler.success(response, category) 
    }
    public async delete({ response, params }: HttpContext) {
        const category = await CategoryBlog.findOrFail(params.id)
        await category.softDelete()
        return ResponseHandler.success(response, []) 
    }
}