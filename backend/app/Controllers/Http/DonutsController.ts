import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { DonutService } from '../../services/DonutService'

export default class DonutsController {
  public async get({ request, response }: HttpContextContract) {
    const page = request.input('page', 0)
    const limit = request.input('limit', 10)
    const keyword = request.input('keyword')
    if (isNaN(limit)) return response.badRequest(`Incorrect value ?limit=${limit} donuts`)
    if (isNaN(page)) return response.badRequest(`Incorrect value ?page=${limit} donuts`)

    return DonutService.select({ page, limit, keyword })
  }
  public async post({}: HttpContextContract) {
    return 'Should Add new donut'
  }
  public async put({}: HttpContextContract) {
    return 'Should modify the given donut'
  }
}
