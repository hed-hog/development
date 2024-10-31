import { Locales } from './Locales'
import { PersonDocumentTypes } from './PersonDocumentTypes'

export type PersonDocumentTypeTranslations = {
  type_id?: number
  locale_id?: number
  name: string
  created_at?: string
  updated_at?: string
  person_document_type?: PersonDocumentTypes
  locale?: Locales
}
