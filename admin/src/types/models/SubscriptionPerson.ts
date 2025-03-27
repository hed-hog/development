import { SubscriptionPersonRoleEnum } from './SubscriptionPersonRoleEnum'
import { Subscription } from './Subscription'
import { Person } from './Person'

export type SubscriptionPerson = {
  id?: number
  subscription_id: number
  person_id: number
  person_name: string
  role: SubscriptionPersonRoleEnum
  created_at?: string
  updated_at?: string
  subscription?: Subscription
  person?: Person
}
