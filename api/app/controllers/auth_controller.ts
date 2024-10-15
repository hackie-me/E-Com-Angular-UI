import User from '#models/user';
import { forgotPasswordValidator, loginValidator, registerValidator, verifyEmailValidator } from '#validators/auth'
import hash from '@adonisjs/core/services/hash'
import type { HttpContext } from '@adonisjs/core/http'
import ResponseHandler from '#utils/response-object';

export default class AuthController {

  public async login({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(loginValidator);
      // Find user by email
      const user = await User.query().where('email', payload.email).first()

      if (!user) {
        return response.unauthorized({
          message: 'Invalid credentials',
        })
      }

      // Verify password
      const isPasswordValid = await hash.verify(user.password, payload.password)
      if (!isPasswordValid) {
        return response.unauthorized({
          message: 'Invalid credentials',
        })
      }
      let data = {
        token: await User.accessTokens.create(user),
        user: user 
      }

      return ResponseHandler.success(response, data) 

    } catch (error) {
      return ResponseHandler.error(response, error.message) 
    } 
  }

  public async register({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(registerValidator);

      // Create a new user
      const user = await User.create({
        username: payload.username,
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        password: payload.password,
        emailVerifiedAt: null
      });

      // Return success response
      return ResponseHandler.created(response, user) 
    } catch (error) {
      return ResponseHandler.error(response, error.message) 
    }
  }

  public async forgotPassword({ request, response }: HttpContext) {
    try {
      const payload = request.validateUsing(forgotPasswordValidator);
      return response.ok(payload)
    } catch (error) {
      return ResponseHandler.error(response, error.message) 
    }
  }

  public async verifyEmail({ request, response }: HttpContext) {
    try {
      const payload = request.validateUsing(verifyEmailValidator);
      return ResponseHandler.success(response, payload) 
    } catch (error) {
      return ResponseHandler.error(response, error.message) 
    }
  }

  public async authCheck({ response }: HttpContext) {
    try {
      return response.ok({
        message: 'Authenticated',
      })
    } catch (error) {
      return ResponseHandler.error(response, error.message) 
    }
  }

}