import { Files } from './Files'
import { PersonAddresses } from './PersonAddresses'
import { PersonContacts } from './PersonContacts'
import { PersonCustoms } from './PersonCustoms'
import { PersonDocuments } from './PersonDocuments'
import { PersonTypes } from './PersonTypes'

export type Persons = {
  id?: number
  name: string
  photo_id?: number
  cover_id?: number
  type_id: number
  birth_at?: string
  created_at?: string
  updated_at?: string
  files?: Files
  files_persons_cover_idTofiles?: Files
  person_type?: PersonTypes
  person_documents?: PersonDocuments[]
  person_contacts?: PersonContacts[]
  person_addresses?: PersonAddresses[]
  person_customs?: PersonCustoms[]
}
