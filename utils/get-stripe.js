import { loadStripe } from '@stripe/stripe-js'

let stripePromise

// This function is used to get the Stripe object
const getStripe = () => {
  // If the Stripe object has not yet been created, create it
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  }
  return stripePromise
}

export default getStripe