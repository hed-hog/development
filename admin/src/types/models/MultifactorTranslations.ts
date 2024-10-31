import { Locales } from './Locales'
import { Multifactors } from './Multifactors'

export type MultifactorTranslations = {
  multifactor_id?: number
  locale_id?: number
  name: string
  created_at?: string
  updated_at?: string
  multifactors?: Multifactors
  locale?: Locales
}
