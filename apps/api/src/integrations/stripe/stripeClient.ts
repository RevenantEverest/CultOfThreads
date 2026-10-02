import Stripe from 'stripe';
import { ENV } from '~/constants';

export const stripeClient = new Stripe(ENV.STRIPE_TOKEN);