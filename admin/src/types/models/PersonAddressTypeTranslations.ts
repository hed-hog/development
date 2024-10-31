import { Locales } from './Locales'
import { PersonAddressTypes } from './PersonAddressTypes'

export type PersonAddressTypeTranslations = {
  type_id?: number
  locale_id?: number
  name: string
  created_at?: string
  updated_at?: string
  person_address_type?: PersonAddressTypes
  locale?: Locales
}
