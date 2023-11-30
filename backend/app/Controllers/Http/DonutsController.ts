import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class DonutsController {
  public async get({ request, response }: HttpContextContract) {
    console.log()
    const page = request.input('page', 0)
    const limit = request.input('limit', 10)
    const keyword = request.input('keyword')
    if (isNaN(limit)) return response.badRequest(`Incorrect value ?limit=${limit} donuts`)
    if (isNaN(page)) return response.badRequest(`Incorrect value ?page=${limit} donuts`)

    return `Should return page ${page} with ${limit} donuts or less ${
      keyword ? `matching the keyword '${keyword}'` : ''
    }`
  }
  public async post({}: HttpContextContract) {
    return 'Should Add new donut'
  }
  public async put({}: HttpContextContract) {
    return 'Should modify the given donut'
  }
}
