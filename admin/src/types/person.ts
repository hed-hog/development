import { PersonAddress } from './address'
import { PersonContact } from './contact'
import { PersonDocument } from './document'
import { TimeStamp } from './timestamp'

export type PersonType = {
  id: number
  name: string
  type_id: number
  birth_at: string
  person_addresses?: PersonAddress[]
  person_contacts?: PersonContact[]
  person_documents?: PersonDocument[]
} & TimeStamp
