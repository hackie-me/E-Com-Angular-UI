// import type { HttpContext } from '@adonisjs/core/http'

import CategoryProduct from "#models/category_product"
import { HttpContext } from "@adonisjs/core/http"

export default class CategoryProductsController {
    public async getAll({ response }: HttpContext) {
        const data = await CategoryProduct.queryWithoutDeleted()
        return response
            .status(200)
            .json({ data })
    }
    public async getById({ response, params }: HttpContext) {
        const data = await CategoryProduct.findOrFail(params.id)
        return response
            .status(200)
            .json({ data })
    }
    public async create({ response, request }: HttpContext) {
        const category = new CategoryProduct()
        category.name = request.input('name')
        await category.save()
        return response
            .status(201)
            .json({ data: category })
    }
    public async update({ response, params, request }: HttpContext) {
        const category = await CategoryProduct.findOrFail(params.id)
        category.name = request.input('name')
        await category.save()
        return response
            .status(200)
            .json({ data: category })
    }
    public async delete({ response, params }: HttpContext) {
        const category = await CategoryProduct.findOrFail(params.id)
        await category.softDelete()
        return response
            .status(204)
            .json({ data: null })
    }
}