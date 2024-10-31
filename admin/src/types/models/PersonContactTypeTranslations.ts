import { Locales } from './Locales'
import { PersonContactTypes } from './PersonContactTypes'

export type PersonContactTypeTranslations = {
  type_id?: number
  locale_id?: number
  name: string
  created_at?: string
  updated_at?: string
  person_contact_type?: PersonContactTypes
  locale?: Locales
}
