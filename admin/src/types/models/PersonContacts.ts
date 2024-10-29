import { Persons } from './Persons';
import { PersonContactTypes } from './PersonContactTypes';

export type PersonContacts = {
  id?: number;
  person_id: number;
  type_id: number;
  primary?: boolean;
  value: string;
  created_at?: string;
  updated_at?: string;
  persons?: Persons;
  person_contact_types?: PersonContactTypes;
}