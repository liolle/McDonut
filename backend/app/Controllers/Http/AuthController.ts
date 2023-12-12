import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from '../../Models/User'
import Env from '@ioc:Adonis/Core/Env'

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

    const token = await auth.attempt(email, password, {
      expiresIn: '90 mins',
    })

    response.cookie('sessionId', token, {
      domain: '.vertix.tech',
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    })

    response.redirect(Env.get('RETURN_TO'))
    return response
  }

  public async logout({ auth, response }: HttpContextContract) {
    await auth.use('api').revoke()

    response.clearCookie('sessionId')
    response.send({
      revoked: true,
    })
  }

  public async googleRedirect({ ally }: HttpContextContract) {
    return ally.use('google').stateless().redirect()
  }

  public async googleCallback({ ally, auth, response }: HttpContextContract) {
    const google = ally.use('google').stateless()

    if (google.accessDenied()) {
      return 'Access was denied'
    }

    if (google.stateMisMatch()) {
      return 'Request expired. Retry again'
    }

    if (google.hasError()) {
      console.log(google)

      return google.getError()
    }

    const googleUser = await google.user()

    if (!googleUser.email)
      return response.json({
        status: false,
        message: 'Something went wrong.',
      })

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

    response.cookie('sessionId', token, {
      domain: '.vertix.tech',
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    })

    response.redirect(Env.get('RETURN_TO'))
    return response
  }

  public async me({ auth }: HttpContextContract) {
    if (!auth.user) {
      return 'Not connected'
    }
    const { email, role, createdAt } = auth.user

    return {
      email,
      role,
      createdAt,
    }
  }
}
