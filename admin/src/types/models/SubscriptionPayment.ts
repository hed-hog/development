import { Payment } from './Payment'

export type SubscriptionPayment = {
  id: number
  subscription_id: number
  payment_id: number
  start_at: string
  end_at: string
  created_at: string
  updated_at: string
  payment?: Payment
  method_name?: string
}
