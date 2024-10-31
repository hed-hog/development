import { PersonContactTypeTranslations } from './PersonContactTypeTranslations'
import { PersonContacts } from './PersonContacts'

export type PersonContactTypes = {
  id?: number
  slug: string
  created_at?: string
  updated_at?: string
  person_contact_type_locale?: PersonContactTypeTranslations[]
  person_contacts?: PersonContacts[]
  name?: string
}
