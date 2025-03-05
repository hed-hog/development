import { SubscriptionLocale } from './SubscriptionLocale'
import { SubscriptionPayment } from './SubscriptionPayment'
import { SubscriptionPerson } from './SubscriptionPerson'
import { SubscriptionPlan } from './SubscriptionPlan'
import { SubscriptionStatusEnum } from './SubscriptionStatusEnum'
import { SubscriptionValue } from './SubscriptionValue'

export type Subscription = {
  id?: number
  plan_id: number
  status: SubscriptionStatusEnum
  limit?: number
  created_at?: string
  updated_at?: string
  subscription_plan?: SubscriptionPlan
  subscription_locale?: SubscriptionLocale[]
  subscription_value?: SubscriptionValue[]
  subscription_person?: SubscriptionPerson[]
  subscription_payment?: SubscriptionPayment
  name?: string
  description?: string
}
