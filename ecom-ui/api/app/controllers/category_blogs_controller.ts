// import type { HttpContext } from '@adonisjs/core/http'

import CategoryBlog from "#models/category_blog";
import { HttpContext } from "@adonisjs/core/http";

export default class CategoryBlogsController {
    public async getAll({ response }: HttpContext) {
        const data = await CategoryBlog.queryWithoutDeleted()
        return response
            .status(200)
            .json({ data })
    }
    public async getById({ response, params }: HttpContext) {
        const data = await CategoryBlog.findOrFail(params.id)
        return response
            .status(200)
            .json({ data })
    }
    public async create({ response, request }: HttpContext) {
        const category = new CategoryBlog()
        category.name = request.input('name')
        await category.save()
        return response
            .status(201)
            .json({ data: category })
    }
    public async update({ response, params, request }: HttpContext) {
        const category = await CategoryBlog.findOrFail(params.id)
        category.name = request.input('name')
        await category.save()
        return response
            .status(200)
            .json({ data: category })
    }
    public async delete({ response, params }: HttpContext) {
        const category = await CategoryBlog.findOrFail(params.id)
        await category.softDelete()
        return response
            .status(204)
            .json({ data: null })
    }
}