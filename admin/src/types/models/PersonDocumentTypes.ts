import { Countries } from './Countries'
import { PersonDocumentTypeTranslations } from './PersonDocumentTypeTranslations'
import { PersonDocuments } from './PersonDocuments'

export type PersonDocumentTypes = {
  id?: number
  country_id: number
  slug: string
  created_at?: string
  updated_at?: string
  countries?: Countries
  person_document_type_locale?: PersonDocumentTypeTranslations[]
  person_documents?: PersonDocuments[]
  name?: string
}
