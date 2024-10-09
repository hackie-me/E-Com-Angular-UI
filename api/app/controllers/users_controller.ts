import User from '#models/user'
import ResponseHandler from '#utils/response-object'
import { InsertVallidator, UpdateVallidator } from '#validators/user'
import { cuid } from '@adonisjs/core/helpers'
import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'

export default class UsersController {

  public async getAll({ response }: HttpContext) {
    const data = await User.queryWithoutDeleted()
    return ResponseHandler.success(response, data) 
  }
  public async getById({ response, params }: HttpContext) {
    const data = await User.findOrFail(params.id)
    return ResponseHandler.success(response, data) 
  }

  public async create({ response, request }: HttpContext) {
    const payload = await request.validateUsing(InsertVallidator);
    
    const avatar = request.file('avatar', {
      size: '2mb',
      extnames: ['jpg', 'png', 'jpeg']
    })

    await avatar?.move(app.makePath('storage/uploads/avatar'), {
      name: `${cuid()}.${avatar.extname}`
    })

    const user = await User.create({
      username: payload.userName,
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      password: payload.password,
      avatar: avatar?.fileName!
    });
    
    return ResponseHandler.created(response, user) 
  }

  public async update({ response, params, request }: HttpContext) {
    const payload = await request.validateUsing(UpdateVallidator);
    const user = await User.findOrFail(params.id)
    user.firstName = payload.firstName;
    user.lastName = payload.lastName;
    user.email = payload.email;
    user.username = payload.userName;

    const avatar = request.file('avatar', {
      size: '2mb',
      extnames: ['jpg', 'png', 'jpeg']
    })
    
    await avatar?.move(app.makePath('storage/uploads/avatar'), {
      name: `${cuid()}.${avatar.extname}`
    })

    user.avatar = avatar?.fileName!;
    await user.save()
    return ResponseHandler.success(response, user) 
  }

  public async delete({ response, params }: HttpContext) {
    const user = await User.findOrFail(params.id)
    await user.softDelete()
    return ResponseHandler.success(response, [])
  }

}