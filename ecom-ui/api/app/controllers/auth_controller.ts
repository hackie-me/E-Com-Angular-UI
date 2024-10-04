import User from '#models/user';
import { forgotPasswordValidator, loginValidator, registerValidator, verifyEmailValidator } from '#validators/auth'
import hash from '@adonisjs/core/services/hash'
import type { HttpContext } from '@adonisjs/core/http'

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

      return await User.accessTokens.create(user);

    } catch (error) {
      return response.badRequest({
        message: 'Registration failed!',
        error: error.messages || error.message,
      });
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
      return response.created({
        message: 'User registered successfully!',
        data: user,
      });
    } catch (error) {
      return response.badRequest({
        message: 'Registration failed!',
        error: error.messages || error.message,
      });
    }
  }

  public async forgotPassword({ request, response }: HttpContext) {
    try {
      const payload = request.validateUsing(forgotPasswordValidator);
      return response.ok(payload)
    } catch (error) {
      return response.badRequest({
        message: 'Registration failed!',
        error: error.messages || error.message,
      });
    }
  }

  public async verifyEmail({ request, response }: HttpContext) {
    try {
      const payload = request.validateUsing(verifyEmailValidator);
      return response.ok(payload)
    } catch (error) {
      return response.badRequest({
        message: 'Registration failed!',
        error: error.messages || error.message,
      });
    }
  }

}