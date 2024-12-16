import { PersonContactType } from './PersonContactType';
import { Locale } from './Locale';

export type PersonContactTypeLocale = {
  type_id?: number;
  locale_id?: number;
  name: string;
  created_at?: string;
  updated_at?: string;
  person_contact_type?: PersonContactType;
  locale?: Locale;
}