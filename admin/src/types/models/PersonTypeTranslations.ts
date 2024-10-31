import { Locales } from './Locales'
import { PersonTypes } from './PersonTypes'

export type PersonTypeTranslations = {
  type_id?: number
  locale_id?: number
  name: string
  created_at?: string
  updated_at?: string
  person_type?: PersonTypes
  locale?: Locales
}
