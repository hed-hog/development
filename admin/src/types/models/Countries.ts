import { CountryTranslations } from './CountryTranslations'
import { PersonAddresses } from './PersonAddresses'
import { PersonDocumentTypes } from './PersonDocumentTypes'
import { PersonDocuments } from './PersonDocuments'

export type Countries = {
  id?: number
  code: string
  created_at?: string
  updated_at?: string
  person_document_type?: PersonDocumentTypes[]
  person_documents?: PersonDocuments[]
  country_locale?: CountryTranslations[]
  person_addresses?: PersonAddresses[]
  name?: string
}
