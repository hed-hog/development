import { Subscription } from './Subscription'
import { Payment } from './Payment'

export type SubscriptionPayment = {
  id?: number
  subscription_id: number
  payment_id: number
  start_at: string
  end_at: string
  method_name: string
  created_at?: string
  updated_at?: string
  subscription?: Subscription
  payment?: Payment
}
