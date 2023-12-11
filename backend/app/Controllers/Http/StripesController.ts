import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { CartItem, StripeClient } from '../../services/Stripe'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class StripesController {
  public async checkoutSession({ request, response }: HttpContextContract) {
    const itemsValidator = schema.create({
      items: schema.array().members(
        schema.object().members({
          price_id: schema.string([rules.regex(/^price_[a-zA-Z0-9]{24}$/)]),
          quantity: schema.number(),
        })
      ),
    })

    try {
      const validation = await request.validate({
        schema: itemsValidator,
        data: request.all(),
      })
      const items: CartItem[] = validation.items
      const session = await new StripeClient().createCheckoutSession(items)
      return session.url
    } catch (error) {
      return response.internalServerError(String(error))
    }
  }
}
