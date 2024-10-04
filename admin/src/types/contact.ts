import { PersonContactType } from './contact-type'

export type PersonContact = {
  id: number
  person_id?: number
  type_id: number
  primary?: boolean
  value: string
  created_at?: string
  updated_at?: string
  person_contact_types?: PersonContactType
}
