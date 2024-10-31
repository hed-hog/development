import { Locales } from './Locales'
import { PersonCustomTypes } from './PersonCustomTypes'

export type PersonCustomTypeTranslations = {
  type_id?: number
  locale_id?: number
  name: string
  created_at?: string
  updated_at?: string
  person_custom_type?: PersonCustomTypes
  locale?: Locales
}
