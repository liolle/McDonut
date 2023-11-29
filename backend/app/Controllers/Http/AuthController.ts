import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from '../../Models/User'

export default class AuthController {
  public async register({ request, response }: HttpContextContract) {
    const { email, password } = request.only(['email', 'password'])

    try {
      const user = await User.create({
        email: email,
        password: password,
      })

      return user
    } catch (error) {
      const { detail } = error
      return response.forbidden({ message: detail })
    }
  }

  public async login({ auth, request, response }: HttpContextContract) {
    const { email, password } = request.only(['email', 'password'])

    try {
      const token = await auth.attempt(email, password)
      return token
    } catch (error) {
      return response.unauthorized({ message: 'password or email incorrect' })
    }
  }

  public async logout({ auth, response }: HttpContextContract) {
    await auth.use('api').revoke()
    return response.json({
      revoked: true,
    })
  }
}
