import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from '../../Models/User'
import Env from '@ioc:Adonis/Core/Env'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class AuthController {
  private credentialValidator = schema.create({
    email: schema.string({}, [rules.email()]),
    password: schema.string({}, []),
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

  public async login({ auth, request, response }: HttpContextContract) {
    try {
      const validation = await request.validate({
        schema: this.credentialValidator,
        data: request.all(),
      })

      await auth.use('api').attempt(validation.email, validation.password)

      const user = await User.findByOrFail('email', validation.email)
      const token = await auth.use('api').generate(user)
      response.cookie('sessionId', token, {
        domain: `${Env.get('DOMAIN')}`,
      })

      return response.ok({})
    } catch (error) {
      return response.badRequest(error)
    }
  }

  public async logout({ request, response, auth }: HttpContextContract) {
    try {
      await auth.use('api').check()
      const cookie = request.cookiesList()

      await auth.use('api').logout()
      response.cookie('sessionId', cookie, {
        maxAge: -1,
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        expires: new Date('Thu, 01 Jan 1970 00:00:00 GMT'),
      })
    } catch (error) {
      return { message: error }
    }
    return { message: 'session cleared' }
  }

  public async googleRedirect({ ally }: HttpContextContract) {
    return ally.use('google').redirect()
  }

  public async googleCallback({ ally, response, auth }: HttpContextContract) {
    const google = ally.use('google')

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
    const token = await auth.use('api').generate(user)
    response.cookie('sessionId', token, {
      domain: `${Env.get('DOMAIN')}`,
    })

    response.redirect(Env.get('RETURN_TO'))
    return response
  }

  public async me({ auth }: HttpContextContract) {
    return auth.user
  }
}
