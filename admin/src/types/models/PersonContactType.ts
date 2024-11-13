import { PersonContact } from './PersonContact';
import { PersonContactTypeLocale } from './PersonContactTypeLocale';

export type PersonContactType = {
  id?: number;
  slug: string;
  created_at?: string;
  updated_at?: string;
  person_contact?: PersonContact[];
  person_contact_type_locale?: PersonContactTypeLocale[];
  name?: string;
}