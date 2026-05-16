import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: Request) {
  const { plan } = await req.json()

  // 🎯 Mapping EXACT de ta landing page
  const plans: Record<string, { amount: number; label: string }> = {
    '25': { amount: 2900, label: 'Instant douceur - 25 min' },
    '45': { amount: 4900, label: 'Moment privé - 45 min' },
    '60': { amount: 6900, label: 'Connexion intense - 60 min' },
  }

  const selected = plans[plan]

  if (!selected) {
    return new Response('Invalid plan', { status: 400 })
  }

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],

    line_items: [
      {
        price_data: {
          currency: 'cad',
          product_data: {
            name: selected.label,
          },
          unit_amount: selected.amount,
        },
        quantity: 1,
      },
    ],

    success_url: 'https://www.velouta.ca/merci',
    cancel_url: 'https://www.velouta.ca/',
  })

  return Response.json({ url: session.url })
}