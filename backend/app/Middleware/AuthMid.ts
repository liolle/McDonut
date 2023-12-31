import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthMid {
  public async handle({ request }: HttpContextContract, next: () => Promise<void>) {
    const token = request.cookie('sessionId')

    // console.log('AuthMid List', request.cookiesList())

    if (request.headers().authorization) {
      await next()
      return
    }
    if (token) {
      request.headers().authorization = `Bearer ${token.token}`
    }

    await next()
  }
}
