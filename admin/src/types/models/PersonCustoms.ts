import { PersonCustomTranslations } from './PersonCustomTranslations'
import { PersonCustomTypes } from './PersonCustomTypes'
import { Persons } from './Persons'

export type PersonCustoms = {
  id?: number
  person_id: number
  type_id: number
  value?: string
  created_at?: string
  updated_at?: string
  persons?: Persons
  person_custom_type?: PersonCustomTypes
  person_custom_locale?: PersonCustomTranslations[]
  name?: string
}
