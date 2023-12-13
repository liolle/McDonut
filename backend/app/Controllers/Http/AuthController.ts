import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from '../../Models/User'
import Env from '@ioc:Adonis/Core/Env'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class AuthController {
  private credentialValidator = schema.create({
    email: schema.string({}, [rules.email()]),
    password: schema.string({}, [rules.confirmed()]),
  })
  public async register({ request, response }: HttpContextContract) {
    try {
      const validation = await request.validate({
        schema: this.credentialValidator,
        data: request.all(),
      })
      const user = await User.create({
        email: validation.email,
        password: validation.password,
      })

      return user
    } catch (error) {
      return response.badRequest(error.messages)
    }
  }

  public async login({ auth, request, response, session }: HttpContextContract) {
    try {
      const validation = await request.validate({
        schema: this.credentialValidator,
        data: request.all(),
      })
      await auth.attempt(validation.email, validation.password, {
        expiresIn: '90 mins',
      })

      const user = await User.findOrFail({
        email: validation.email,
      })

      session.put('email', user.email)
      session.put('provider', 'google')
      session.put('role', user.role)
      session.put('createdAt', user.createdAt)
      session.put('connected', true)
    } catch (error) {
      return response.badRequest(error.messages)
    }

    response.redirect(Env.get('RETURN_TO'))
    return response
  }

  public async logout({ session }: HttpContextContract) {
    session.clear()
    return { message: 'session cleared' }
  }

  public async googleRedirect({ ally }: HttpContextContract) {
    return ally.use('google').stateless().redirect()
  }

  public async googleCallback({ ally, session, response }: HttpContextContract) {
    const google = ally.use('google').stateless()

    if (google.accessDenied()) {
      return 'Access was denied'
    }

    if (google.stateMisMatch()) {
      return 'Request expired. Retry again'
    }

    if (google.hasError()) {
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

    session.put('email', user.email)
    session.put('provider', 'google')
    session.put('role', user.role)
    session.put('createdAt', user.createdAt)
    session.put('connected', true)
    response.redirect(Env.get('RETURN_TO'))
    return response
  }

  public async me({ session }: HttpContextContract) {
    return session.all()
  }
}
