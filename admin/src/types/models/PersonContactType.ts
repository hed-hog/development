import { PersonContactTypeLocale } from './PersonContactTypeLocale';
import { PersonContact } from './PersonContact';

export type PersonContactType = {
  id?: number;
  slug: string;
  created_at?: string;
  updated_at?: string;
  person_contact_type_locale?: PersonContactTypeLocale[];
  person_contact?: PersonContact[];
  name?: string;
}