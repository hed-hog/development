import { Files } from './Files';
import { PersonTypes } from './PersonTypes';
import { PersonDocuments } from './PersonDocuments';
import { PersonContacts } from './PersonContacts';
import { PersonAddresses } from './PersonAddresses';
import { PersonCustoms } from './PersonCustoms';

export type Persons = {
  id?: number;
  name: string;
  photo_id?: number;
  type_id: number;
  birth_at?: string;
  created_at?: string;
  updated_at?: string;
  files?: Files;
  person_types?: PersonTypes;
  person_documents?: PersonDocuments[];
  person_contacts?: PersonContacts[];
  person_addresses?: PersonAddresses[];
  person_customs?: PersonCustoms[];
}