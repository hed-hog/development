import { Person } from './Person';
import { PersonContactType } from './PersonContactType';

export type PersonContact = {
  id?: number;
  person_id: number;
  type_id: number;
  primary?: boolean;
  value: string;
  created_at?: string;
  updated_at?: string;
  person?: Person;
  person_contact_type?: PersonContactType;
}