import { Stripe } from 'stripe'

const client = new Stripe(`${process.env.STRIPE_API_KEY}`, {
  apiVersion: '2023-10-16',
  typescript: true,
})

export abstract class CartItem {
  price_id: string
  quantity: number
}

export class StripeClient {
  async createCheckoutSession(items: CartItem[]) {
    const session = await client.checkout.sessions.create({
      line_items: items.map((value) => {
        return {
          price: value.price_id,
          quantity: value.quantity,
        }
      }),
      mode: 'payment',
      success_url: `${process.env.CLIENT}?state=success`,
      cancel_url: `${process.env.CLIENT}/products?state=canceled`,
    })

    return session
  }
}
