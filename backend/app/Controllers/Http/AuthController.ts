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

    if (!email || !password)
      return response.unauthorized({ message: 'password or email incorrect' })

    try {
      const token = await auth.attempt(email, password, {
        expiresIn: '90 mins',
      })
      response.cookie('sessionId', token.token)

      return response.json({
        token: token.token,
      })
    } catch (error) {
      return response.unauthorized({ message: 'password or email incorrect' })
    }
  }

  public async logout({ auth, response }: HttpContextContract) {
    await auth.use('api').revoke()
    response.clearCookie('sessionId')
    return response.json({
      revoked: true,
    })
  }

  public async googleRedirect({ ally }: HttpContextContract) {
    return ally.use('google').redirect()
  }

  public async googleCallback({ ally, auth, response }: HttpContextContract) {
    const google = ally.use('google')

    /**
     * User has explicitly denied the login request
     */
    if (google.accessDenied()) {
      return 'Access was denied'
    }

    /**
     * Unable to verify the CSRF state
     */
    if (google.stateMisMatch()) {
      return 'Request expired. Retry again'
    }

    /**
     * There was an unknown error during the redirect
     */
    if (google.hasError()) {
      console.log(google)

      return google.getError()
    }

    /**
     * Finally, access the user
     */

    const googleUser = await google.user()

    if (!googleUser.email)
      return response.json({
        status: false,
        message: 'Something went wrong.',
      })
    /**
     * Find the user by email or create
     * a new one
     */

    try {
      const user = await User.firstOrCreate(
        {
          email: googleUser.email,
        },
        {
          email: googleUser.email,
          provider: 'google',
          access_token: googleUser.token.token,
        }
      )

      const token = await auth.use('api').generate(user, {
        expiresIn: '90 mins',
      })

      response.cookie('sessionId', token)

      return response
    } catch (error) {
      return error
    }
  }

  public async me({ auth }: HttpContextContract) {
    const { email, role, createdAt } = auth.user

    return {
      email,
      role,
      createdAt,
    }
  }
}
