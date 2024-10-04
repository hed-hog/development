import { PersonDocumentType } from './document-type'

export type PersonDocument = {
  id: number
  person_id?: number
  type_id: number
  primary?: boolean
  value: string
  country_id?: number
  issued_at?: string | null
  expiry_at?: string | null
  created_at?: string
  updated_at?: string
  person_document_types?: PersonDocumentType
}
